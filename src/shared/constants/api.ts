import type { InfiniteDataMeta } from "../api/common.interface";

/** 기본 revalidate: 30 minutes */
export const DEFAULT_REVALIDATE = 1800;

export const DEFAULT_PAGINATE_LIMIT = 10 as const;

export const INITIAL_INFINITE_DATA_META: InfiniteDataMeta = {
  total: 0,
  message: "",
  status: 200,
};
