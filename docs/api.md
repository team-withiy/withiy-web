# [WIP] API

사용되는 api의 종류로는 크게 두 가지로 나뉜다.

- [ky](https://github.com/sindresorhus/ky)를 이용한 클라이언트단 데이터 페칭
- fetch를 이용한 서버사이드단 데이터 페칭

## Authorization

프로젝트에서는 서버사이드단에서도 fetch를 통해 authorization이 가능하도록 token은 모두 cookies에 저장한다.
[middleware](../middleware.ts)를 통해 authorization이 필요한 페이지에서 valid한 토큰을 가지고 있는지 체크하며, 만료되어있을 경우 refresh로직을 거친다.

refresh 이후 토큰 저장을 위해 cookies를 저장하는 과정에서, next.js에서 cookies를 통해 set-cookie과정을 거치는 것은 ServerActions 혹은 routeHandler를 통해서만 가능하기에, routeHandler api를 하나 제작하여 사용한다.

> AuthorizedHandler를 사용함에도 불구하고 middleware를 사용해야 하는 이유
>
> client component가 서버사이드에서 렌더링되는 경우에는 토큰이 유효하지 않거나, 만료된 토큰을 사용할 수도 있기 때문에, 브라우저에서 리소스 요청 시 바로 미들웨어에서 처리하도록 한다.

## Client

- [apiClient](#apiclient)
- [authApiClient](#authapiclient)

### apiClient

다른 구현 내용 없이 ky를 사용하여 instance인 apiClient를 만들며, prefixUrl을 세팅한다.

### authApiClient

- apiClient와 같이 동일하게 api 요청을 진행하나, routeHandler를 통해 authorization를 진행한다.
  - 즉, next.js server를 proxy로 사용하여 client 단에 token을 유출하지 않도록 한다.
- 토큰이 만료되었을 경우 refresh api를 통해 토큰을 갱신

## Server

- baseServerApi
- apiServer
- routeHandlerApi
- authApiServer

---

## DTO 타입

[해당 파트](https://feature-sliced.github.io/documentation/kr/docs/guides/examples/types#%EB%B9%84%EC%A6%88%EB%8B%88%EC%8A%A4-%EC%97%94%ED%8B%B0%ED%8B%B0-%EB%B0%8F-%EC%83%81%ED%98%B8-%EC%B0%B8%EC%A1%B0-%EA%B4%80%EA%B3%84)에서 설명하듯, a 도메인의 A DTO가 b 도메인의 B DTO를 포함하고 있을 수 있다. e.g, User의 Address.
그런 경우 cross-import 방식으로 사용하여 다른 엔티티에 대한 공개 API를 `@x`를 사용하여 표기한다.

## Queries

- 쿼리 키는 [query-key-factory](https://github.com/lukemorales/query-key-factory)를 사용하며, entities 폴더에서 관리한다.
- slice 별 폴더 구조는 다음과 같다.

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
        ├── domain.route-handler.ts     # routeHandlerApi를 사용하는 함수
        └── domain.queries.ts           # query-key-factory를 사용한 쿼리 키

```

## Mutations

- mutation은 쿼리와 같이 처리하지 않고, 사용되는 위치의 api segment에서 관리한다.
  - [관련 문서](https://feature-sliced.github.io/documentation/kr/docs/guides/tech/with-react-query#mutation-%EC%9C%84%EC%B9%98-%EC%84%A4%EC%A0%95-%EB%AC%B8%EC%A0%9C)
