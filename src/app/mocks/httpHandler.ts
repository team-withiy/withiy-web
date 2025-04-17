import dotenv from "dotenv";
import { DefaultBodyType, http, HttpHandler, HttpResponseResolver, PathParams, RequestHandlerOptions } from "msw";

dotenv.config({ path: "env/.env.test" });

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type MockingHttpHandler = <
  Params extends PathParams<keyof Params> = PathParams,
  RequestBodyType extends DefaultBodyType = DefaultBodyType,
  ResponseBodyType extends DefaultBodyType = DefaultBodyType,
>(
  path: string,
  resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>,
  options?: RequestHandlerOptions,
) => HttpHandler;

interface ReturnHttpHandler {
  get: MockingHttpHandler;
  post: MockingHttpHandler;
  put: MockingHttpHandler;
  delete: MockingHttpHandler;
  patch: MockingHttpHandler;
}

const serverHttpHandler = (() => {
  const getUrl = (url: string) => {
    return url.startsWith("http") ? url : `${API_URL}${url}`;
  };

  const _serverHttpHandler: ReturnHttpHandler = {
    get: (url, resolver, options) => http.get(getUrl(url), resolver, options),
    post: (url, resolver, options) => http.post(getUrl(url), resolver, options),
    put: (url, resolver, options) => http.put(getUrl(url), resolver, options),
    patch: (url, resolver, options) => http.patch(getUrl(url), resolver, options),
    delete: (url, resolver, options) => http.delete(getUrl(url), resolver, options),
  };

  return _serverHttpHandler;
})();

const localHttpHandler = (() => {
  const getUrl = (url: string) => {
    return url.startsWith("http") ? url : `${BASE_URL}${url}`;
  };

  const _localHttpHandler: ReturnHttpHandler = {
    get: (url, resolver, options) => http.get(getUrl(url), resolver, options),
    post: (url, resolver, options) => http.post(getUrl(url), resolver, options),
    put: (url, resolver, options) => http.put(getUrl(url), resolver, options),
    patch: (url, resolver, options) => http.patch(getUrl(url), resolver, options),
    delete: (url, resolver, options) => http.delete(getUrl(url), resolver, options),
  };

  return _localHttpHandler;
})();

export { localHttpHandler, serverHttpHandler };
