import { useSearchParams } from "next/navigation";

import { PaginationReviewSortBy } from "@/entities/place/api/place.interface";

const useSortBy = () => {
  const searchParams = useSearchParams();

  const sortBy = (() => {
    const sortByParam = searchParams.get("sortBy");
    if (sortByParam !== PaginationReviewSortBy.LATEST && sortByParam !== PaginationReviewSortBy.SCORE) {
      return PaginationReviewSortBy.LATEST;
    }

    return sortByParam;
  })();

  return {
    sortBy,
  };
};

export default useSortBy;
