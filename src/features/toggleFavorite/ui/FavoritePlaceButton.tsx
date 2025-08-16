"use client";

import { useQuery } from "@tanstack/react-query";
import cx from "clsx";

import { placeQueries } from "@/entities/place/api/place.queries";

import IconButton from "@/shared/ui/IconButton";

import { IconHeart16 } from "public/icons";

import styles from "./FavoritePlaceButton.module.scss";

interface Props {
  placeId: number;
}

const FavoritePlaceButton: React.FC<Props> = ({ placeId }) => {
  const { data } = useQuery({ ...placeQueries.getPlaceBookmark(placeId), throwOnError: false });

  return (
    <IconButton
      type="button"
      variant="outline"
      icon={<IconHeart16 className={cx(styles.icon, { [styles.active]: data?.data })} />}
      className={styles.wrapper}
    >
      저장
    </IconButton>
  );
};

export default FavoritePlaceButton;
