import CursorVerticalInfiniteScrollBoundary from "./CursorVerticalInfiniteScrollBoundary";
import CursorVerticalInfiniteScrollContainer from "./CursorVerticalInfiniteScrollContainer";
import EmptyErrorBoundary from "./EmptyErrorBoundary";
import SuspenseCursorVerticalInfiniteScrollBoundary from "./SuspenseCursorVerticalInfiniteScrollBoundary";
import SuspenseCursorVerticalInfiniteScrollContainer from "./SuspenseCursorVerticalInfiniteScrollContainer";

export const InfiniteScroll = Object.freeze({
  EmptyBoundary: EmptyErrorBoundary,
  Suspense: {
    Cursor: {
      Vertical: {
        Boundary: SuspenseCursorVerticalInfiniteScrollBoundary,
        Container: SuspenseCursorVerticalInfiniteScrollContainer,
      },
    },
  },
  Cursor: {
    Vertical: {
      Boundary: CursorVerticalInfiniteScrollBoundary,
      Container: CursorVerticalInfiniteScrollContainer,
    },
  },
});
