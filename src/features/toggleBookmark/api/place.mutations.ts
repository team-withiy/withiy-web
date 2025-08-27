import { useMutation, useQueryClient } from "@tanstack/react-query";

import { folderQueries } from "@/entities/folder/api/folder.queries";
import { updatePlaceBookmarkApi } from "@/entities/place/api/place.mutations";
import { placeQueries } from "@/entities/place/api/place.queries";

import type { ApiResponseDTO } from "@/shared/api/common.interface";

export const useUpdatePlaceBookmarkMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePlaceBookmarkApi,
    onMutate: ({ placeId, folderIds }) => {
      queryClient.setQueryData<ApiResponseDTO<boolean>>(placeQueries.getPlaceBookmark(placeId).queryKey, (prev) => {
        if (!prev) return prev;
        return { ...prev, data: folderIds.length > 0 };
      });
    },
    onSuccess: async (_, { placeId }) => {
      await Promise.all([
        queryClient.invalidateQueries(placeQueries.getPlaceBookmark(placeId)),
        queryClient.invalidateQueries(folderQueries.getPlaceFolders(placeId)),
      ]);
    },
  });
};
