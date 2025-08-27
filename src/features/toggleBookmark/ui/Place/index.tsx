"use client";

import { useState } from "react";

import { usePathname } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import cx from "clsx";

import RequireAuthorizationWrapper from "@/features/checkAuthorization/ui/RequireAuthorizationWrapper";

import { placeQueries } from "@/entities/place/api/place.queries";

import IconButton from "@/shared/ui/IconButton";

import BookmarkPlaceFolderBottomSheet from "./BookmarkPlaceBottomSheet";
import { IconHeart16 } from "public/icons";

import styles from "./BookmarkPlaceButton.module.scss";

interface Props {
  placeId: number;
  placeName: string;
}

const BookmarkPlaceButton: React.FC<Props> = ({ placeId, placeName }) => {
  const pathname = usePathname();
  const { data } = useQuery({ ...placeQueries.getPlaceBookmark(placeId), throwOnError: false });

  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);

  return (
    <>
      <RequireAuthorizationWrapper callbackUrl={pathname} hasBottomSheet>
        <IconButton
          type="button"
          variant="outline"
          onClick={() => setIsShowBottomSheet(true)}
          icon={<IconHeart16 className={cx(styles.icon, { [styles.active]: data?.data })} />}
          className={styles.wrapper}
        >
          저장
        </IconButton>
      </RequireAuthorizationWrapper>
      <BookmarkPlaceFolderBottomSheet
        isShow={isShowBottomSheet}
        onClose={() => setIsShowBottomSheet(false)}
        placeName={placeName}
        placeId={placeId}
      />
    </>
  );
};

export default BookmarkPlaceButton;
