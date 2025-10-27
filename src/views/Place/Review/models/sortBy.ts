import { PaginationReviewSortBy } from "@/entities/place/api/place.interface";

export const SORT_BY_MAPPER = {
  [PaginationReviewSortBy.LATEST]: "최신순",
  [PaginationReviewSortBy.SCORE]: "추천순",
};
