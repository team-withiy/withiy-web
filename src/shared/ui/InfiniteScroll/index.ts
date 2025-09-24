import CursorVerticalInfiniteScrollContainer from "./CursorVerticalInfiniteScrollContainer";
import EmptyErrorBoundary from "./EmptyErrorBoundary";
import SuspenseCursorVerticalInfiniteScrollContainer from "./SuspenseCursorVerticalInfiniteScrollContainer";
import CursorPaginationBoundary from "../Boundary/CursorPaginationBoundary";
import SuspenseCursorPaginationBoundary from "../Boundary/SuspenseCursorPaginationBoundary";

export const InfiniteScroll = Object.freeze({
  EmptyBoundary: EmptyErrorBoundary,
  Suspense: {
    Cursor: {
      Vertical: {
        Boundary: SuspenseCursorPaginationBoundary,
        Container: SuspenseCursorVerticalInfiniteScrollContainer,
      },
    },
  },
  Cursor: {
    Vertical: {
      Boundary: CursorPaginationBoundary,
      Container: CursorVerticalInfiniteScrollContainer,
    },
  },
});
