import CursorHorizontalInfiniteScrollContainer from "./CursorHorizontalInfiniteScrollContainer";
import CursorVerticalInfiniteScrollContainer from "./CursorVerticalInfiniteScrollContainer";
import EmptyErrorBoundary from "./EmptyErrorBoundary";
import SuspenseCursorHorizontalInfiniteScrollContainer from "./SuspenseCursorHorizontalInfiniteScrollContainer";
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
      Horizontal: {
        Boundary: SuspenseCursorPaginationBoundary,
        Container: SuspenseCursorHorizontalInfiniteScrollContainer,
      },
    },
  },
  Cursor: {
    Vertical: {
      Boundary: CursorPaginationBoundary,
      Container: CursorVerticalInfiniteScrollContainer,
    },
    Horizontal: {
      Boundary: CursorPaginationBoundary,
      Container: CursorHorizontalInfiniteScrollContainer,
    },
  },
});
