import CursorVerticalInfiniteScroll from "./CursorVerticalInfiniteScroll";
import EmptyErrorBoundary from "./EmptyErrorBoundary";
import SuspenseCursorVerticalInfiniteScroll from "./SuspenseCursorVerticalInfiniteScroll";

export const InfiniteScroll = Object.freeze({
  EmptyBoundary: EmptyErrorBoundary,
  Suspense: {
    Cursor: {
      Vertical: SuspenseCursorVerticalInfiniteScroll,
    },
  },
  Cursor: {
    Vertical: CursorVerticalInfiniteScroll,
  },
});
