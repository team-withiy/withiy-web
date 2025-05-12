# API

사용되는 api의 종류로는 크게 두 가지로 나뉩니다.

- [ky](https://github.com/sindresorhus/ky)를 이용한 클라이언트단 데이터 페칭
- fetch를 이용한 서버사이드단 데이터 페칭

## Authorization

프로젝트에서는 서버사이드단에서도 fetch를 통해 authorization이 가능하도록 token은 모두 cookies에 저장합니다.

[middleware](../middleware.ts)를 통해 authorization이 필요한 페이지에서 valid한 토큰을 가지고 있는지 체크하며, 만료되어있을 경우 refresh로직을 거칩니다.

### middleware

middleware 내에서는 promiseHolder를 사용하고 있습니다.
하나의 페이지를 접근할 때에도 토큰 갱신이 필요한 여러 요청이 들어오는 경우, race condition이 생길 수 있습니다.

즉 refresh가 되었음에도 불구하고, 또 다른 요청은 refresh되기 이전의 token을 사용할 수 있다는 것입니다.

그렇기에 PromiseHolder를 사용하여 Mutex를 구현합니다.

```typescript
// middleware.ts
import { PromiseHolder } from "@/shared/lib/promiseHolder";

const promiseHolder = new PromiseHolder();

export async function middleware(request: NextRequest) {
  const { accessToken, refreshToken } = await getServerTokens();
  if (!accessToken || !refreshToken) return NextResponse.next();

  try {
    // 토큰 유효성 검사
    const { isAccessTokenValid, isRefreshTokenValid } = isValidToken({
      accessToken,
      refreshToken,
    });

    // 액세스 토큰이 유효하면 별도 처리 없음
    if (isAccessTokenValid) {
      return NextResponse.next();
    }

    // 액세스 토큰은 만료됐지만 리프레시 토큰은 유효한 경우 토큰 갱신
    if (!isAccessTokenValid && isRefreshTokenValid) {
      // race condition 방지: 이미 다른 요청이 토큰 갱신 중이라면 기다림
      if (promiseHolder.isLocked) {
        await promiseHolder.promise;
        return NextResponse.next();
      }

      // 락 설정하여 다른 요청들이 이 갱신 작업이 끝날 때까지 대기하도록 함
      promiseHolder.hold();

      // 리프레시 토큰으로 새 토큰 발급 요청
      const { status, data } = await postServer("/auth/refresh", {
        body: { refreshToken },
      }).then((res) => res.json<ApiResponseDTO<TokenDTO>>());

      // 토큰 갱신 실패 시 에러 발생
      if (isStatusError(status)) throw new Error("토큰 리프레시 API 에러");

      // 성공 시 쿠키에 새 토큰 설정
      const response = NextResponse.redirect(request.nextUrl);
      response.cookies.set(ACCESS_TOKEN_KEY, data.accessToken, COOKIE_OPTIONS);
      response.cookies.set(REFRESH_TOKEN_KEY, data.refreshToken, COOKIE_OPTIONS);

      // 락 해제 및 결과 반환
      promiseHolder.successRelease();
      return response;
    } else if (!isAccessTokenValid && !isRefreshTokenValid) {
      // 두 토큰 모두 유효하지 않은 경우
      throw new Error("액세스 토큰과 리프레시 토큰 모두 유효하지 않음");
    }

    return NextResponse.next();
  } catch {
    // 에러 발생 시 락 해제 및 로그인 페이지로 리다이렉트
    if (promiseHolder.isLocked) {
      promiseHolder.failRelease();
    }
    const response = NextResponse.redirect(new URL("/auth", request.url));
    response.cookies.delete(ACCESS_TOKEN_KEY);
    response.cookies.delete(REFRESH_TOKEN_KEY);
    return response;
  }
}
```

### PromiseHolder

미들웨어에서 사용하는 `PromiseHolder` 클래스는 동시에 발생하는 여러 토큰 갱신 요청을 관리하기 위한 뮤텍스(Mutex) 패턴을 구현합니다. 이를 통해 여러 요청이 동시에 토큰 갱신을 시도하는 경우 한 번만 갱신 API를 호출하고, 다른 요청들은 그 결과를 대기하도록 합니다.

```typescript
// src/shared/lib/promiseHolder.ts
export class PromiseHolder {
  isLocked = false;
  promise?: Promise<void>;
  private resolve?: () => void;
  private reject?: (reason?: unknown) => void;

  // 락 설정 및 프로미스 생성
  hold() {
    this.promise = new Promise((resolve, reject) => Object.assign(this, { reject, resolve }));
    this.isLocked = true;
  }

  // 작업 성공 시 락 해제
  successRelease() {
    if (!this.promise) return;
    this.resolve!();
    this.isLocked = false;
  }

  // 작업 실패 시 락 해제
  failRelease(error?: unknown) {
    if (!this.promise) return;
    this.reject!(error);
    this.isLocked = false;
  }
}
```

이 패턴을 사용함으로써 얻는 이점:

1. **API 요청 최적화**: 여러 컴포넌트가 동시에 인증이 필요한 API를 호출할 때 토큰 갱신은 단 한 번만 수행됩니다.
2. **일관성 보장**: 모든 요청이 동일한 새로운 토큰을 사용하게 됩니다.
3. **에러 처리 통합**: 토큰 갱신 실패 시 모든 대기 중인 요청에 동일한 에러가 전파됩니다.

## Client

- [apiClient](#apiclient)
- [apiRouteHandler](#apiroutehandler)

### apiClient

다른 구현 내용 없이 ky를 사용하여 instance인 apiClient를 만들며, prefixUrl을 세팅합니다.

### apiRouteHandler

apiClient와 동일하게 작동하되 routeHandler를 호출하기 위해 prefixUrl을 변형하여 사용합니다.

## Server

- [\_server](#_server) - 서버 API 기본 함수
- [apiServer](#apiserver) - 일반 서버 API 요청 처리
- [authApiServer](#authapiserver) - 인증이 필요한 서버 API 요청 처리

### \_server

서버 API의 기본 함수로, `_get`과 `_mutate` 두 가지 주요 함수를 제공합니다. 이 함수들은 HTTP 요청을 처리하는 저수준 기능을 담당합니다.

```typescript
// _get 함수: GET 요청을 실행
export const _get = async (baseUrl: string, url: string, options: GetOptions) => {
  // params가 있으면 URL에 추가
  const params = getSearchParamsString(options?.params);

  // fetch 요청 실행
  const response = await fetch(`${baseUrl}${url}${params}`, {
    method: "GET",
    next: {
      // 캐시 설정
      revalidate: getNextRevalidate(options),
      tags: options.tags,
    },
    cache: options.cache,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  return response;
};

// _mutate 함수: POST, PUT, PATCH, DELETE 요청을 실행
export const _mutate = async (baseUrl: string, method: string, url: string, options: MutateOptions) => {
  // 요청 실행 및 응답 반환
  // ...
};
```

### apiServer

`apiServer`는 `_server` 함수를 기반으로 만들어진 서버 사이드 API 클라이언트입니다. 각 HTTP 메소드(`GET`, `POST`, `PATCH`, `PUT`, `DELETE`)에 대한 래퍼 함수를 제공합니다.

```typescript
// 환경변수에서 BASE_URL 가져옴
const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

// HTTP 메소드별 함수 제공
export const getServer = async (url: string, options: GetOptions) => await _get(BASE_URL, url, options);

export const postServer = async (url: string, options: MutateOptions) => await _mutate(BASE_URL, "POST", url, options);

export const patchServer = async (url: string, options: MutateOptions) =>
  await _mutate(BASE_URL, "PATCH", url, options);

export const putServer = async (url: string, options: MutateOptions) => await _mutate(BASE_URL, "PUT", url, options);

export const deleteServer = async (url: string, options: MutateOptions) =>
  await _mutate(BASE_URL, "DELETE", url, options);
```

### authApiServer

`authApiServer`는 인증이 필요한 API 요청을 처리하기 위한 특별한 서버 API 클라이언트입니다. 이 모듈은 특히 액세스 토큰과 리프레시 토큰을 관리하는 기능을 포함하고 있습니다.

주요 특징:

1. 자동 토큰 갱신: 액세스 토큰이 만료된 경우 리프레시 토큰을 사용하여 자동으로 새 토큰을 발급받음
2. 인증 헤더 관리: 모든 요청에 자동으로 액세스 토큰을 포함
3. 재시도 로직: 토큰 갱신 후 실패한 요청을 자동으로 재시도

```typescript
// 인증이 필요한 요청을 처리하는 내부 함수
const _mutateAuth = async (url: string, method: string, options: MutateOptions) => {
  // 토큰 가져오기
  const [accessToken, refreshToken] = [
    options._tokens?.accessToken || (await getServerAccessToken()),
    options._tokens?.refreshToken || (await getServerRefreshToken()),
  ];

  try {
    // 액세스 토큰으로 요청 시도
    return await _mutate(BASE_URL, method, url, {
      ...options,
      headers: { ...options?.headers, authorization: `Bearer ${accessToken}` },
    });
  } catch {
    // 실패하면 토큰 갱신 후 재시도
    const tokens = await _refresh(refreshToken);
    return await _mutateAuth(url, method, { ...options, _tokens: tokens.data });
  }
};

// GET 요청 함수
export const getAuthServer = async (url: string, options: GetOptions) => {
  const [accessToken, refreshToken] = [
    options._tokens?.accessToken || (await getServerAccessToken()),
    options._tokens?.refreshToken || (await getServerRefreshToken()),
  ];

  try {
    // 액세스 토큰으로 GET 요청 시도
    return await _get(BASE_URL, url, {
      ...options,
      headers: { ...options?.headers, authorization: `Bearer ${accessToken}` },
    });
  } catch {
    // 실패하면 토큰 갱신 후 재시도
    const tokens = await _refresh(refreshToken);
    return await getAuthServer(url, { ...options, _tokens: tokens.data });
  }
};

// 각 HTTP 메소드별 함수
export const postAuthServer = async (url: string, options: MutateOptions) => await _mutateAuth(url, "POST", options);

export const patchAuthServer = async (url: string, options: MutateOptions) => await _mutateAuth(url, "PATCH", options);

export const putAuthServer = async (url: string, options: MutateOptions) => await _mutateAuth(url, "PUT", options);

export const deleteAuthServer = async (url: string, options: MutateOptions) =>
  await _mutateAuth(url, "DELETE", options);
```

### 토큰 갱신 메커니즘

토큰 갱신은 `middleware.ts`와 `authApiServer.ts`에서 두 단계로 이루어집니다:

1. **미들웨어 단계 갱신**:

   - 페이지 요청 시 미들웨어에서 토큰 유효성 검사
   - 액세스 토큰 만료 & 리프레시 토큰 유효 → 자동 토큰 갱신
   - `PromiseHolder`로 동시 요청에 대한 race condition 방지

2. **API 요청 단계 갱신**:
   - API 요청 실패 시 `authApiServer`에서 토큰 갱신
   - 갱신 후 원래 요청 자동 재시도

이 접근 방식은 클라이언트에게 토큰 관리 부담 없이 seamless한 인증 경험을 제공합니다.

---

## DTO 타입

[해당 파트](https://feature-sliced.github.io/documentation/kr/docs/guides/examples/types#%EB%B9%84%EC%A6%88%EB%8B%88%EC%8A%A4-%EC%97%94%ED%8B%B0%ED%8B%B0-%EB%B0%8F-%EC%83%81%ED%98%B8-%EC%B0%B8%EC%A1%B0-%EA%B4%80%EA%B3%84)에서 설명하듯, a 도메인의 A DTO가 b 도메인의 B DTO를 포함하고 있을 수 있습니다. e.g, User의 Address.
그런 경우 cross-import 방식으로 사용하여 다른 엔티티에 대한 공개 API를 `@x`를 사용하여 표기합니다.

## Queries

- 쿼리 키는 [query-key-factory](https://github.com/lukemorales/query-key-factory)를 사용하며, entities 폴더에서 관리합니다.
- slice 별 폴더 구조는 다음과 같습니다.

```text
entities
└── domain
    └── api
        ├── @x                          # 공개 API
        |   └── other-domain.ts
        ├── domain.interface.ts         # type 명시 파일
        ├── domain.mutations.ts         # create, update, delete와 같은 기능을 하는 client service 함수
        ├── domain.server-mutations.ts  # apiServer를 사용해 server side에서 실행되는 mutation service 함수
        ├── domain.server.ts            # apiServer를 사용해 server side에서 실행되는 service 함수
        └── domain.queries.ts           # query-key-factory를 사용한 쿼리 키

```

## Mutations

- mutation은 쿼리와 같이 처리하지 않고, 사용되는 위치의 api segment에서 관리합니다.
  - [관련 문서](https://feature-sliced.github.io/documentation/kr/docs/guides/tech/with-react-query#mutation-%EC%9C%84%EC%B9%98-%EC%84%A4%EC%A0%95-%EB%AC%B8%EC%A0%9C)
