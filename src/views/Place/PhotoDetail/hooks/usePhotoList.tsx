import { useCallback, useEffect, useMemo } from "react";

import { useParams, useRouter } from "next/navigation";

import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { PhotoDTO } from "@/entities/photo/api/photo.interface";
import { placeQueries } from "@/entities/place/api/place.queries";

import { ApiResponseDTO } from "@/shared/api/common.interface";
import useCursorPaginationQuery from "@/shared/hooks/useCursorPaginationQuery";

const usePhotoList = () => {
  const queryClient = useQueryClient();
  const { photoId, placeId } = useParams<{ placeId: string; photoId: string }>();
  const router = useRouter();

  const { data: photo } = useSuspenseQuery(
    placeQueries.getPhoto({ photoId: Number(photoId), placeId: Number(placeId) }),
  );
  const { data: prevPhotos } = useCursorPaginationQuery(
    placeQueries.paginatePhotosWithPageParam({ placeId: Number(placeId), cursor: Number(photoId), prev: true }),
  );
  const { data: nextPhotos } = useCursorPaginationQuery(
    placeQueries.paginatePhotosWithPageParam({ placeId: Number(placeId), cursor: Number(photoId), prev: false }),
  );

  const photos = useMemo(
    () => [...(prevPhotos?.data ?? []), photo.data, ...(nextPhotos?.data ?? [])],
    [nextPhotos?.data, photo.data, prevPhotos?.data],
  );

  const onFocusPhoto = useCallback(
    (focusedPhotoId: number) => {
      router.replace(`/places/${placeId}/photos/${focusedPhotoId}`);
      window.history.replaceState(null, "", `/places/${placeId}/photos/${focusedPhotoId}`);
    },
    [placeId, router],
  );

  useEffect(() => {
    if (!prevPhotos || prevPhotos.meta.total === 0) return;
    if (!nextPhotos || nextPhotos.meta.total === 0) return;

    [...prevPhotos.data, ...nextPhotos.data].forEach((photo) => {
      queryClient.setQueryData<ApiResponseDTO<PhotoDTO>>(
        placeQueries.getPhoto({ photoId: photo.photoId, placeId: Number(placeId) }).queryKey,
        (prev) => {
          if (prev) return prev;
          return { status: 200, message: "OK", data: photo, timestamp: new Date() };
        },
      );
    });
  }, [prevPhotos, nextPhotos, queryClient, placeId]);

  return { currentPhoto: photo.data, currentPhotoIndex: (prevPhotos?.data ?? []).length, photos, onFocusPhoto };
};

export default usePhotoList;
