import { apiRouteHandler } from "@/shared/api/apiRouteHandler";
import { getSearchParams } from "@/shared/lib/searchParams";

export const revalidateTagApi = async (tag: string) =>
  apiRouteHandler.get("revalidate/tag", { searchParams: getSearchParams({ tag }) });

export const revalidatePathApi = async (path: string, type: "layout" | "page") =>
  apiRouteHandler.get("revalidate/path", { searchParams: getSearchParams({ path, type }) });
