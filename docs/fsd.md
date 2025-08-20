# FSD architecture

해당 프로젝트는 [FSD architecture](https://feature-sliced.github.io/documentation/kr/)를 따릅니다.

폴더 구조는 Next.js의 app directory를 사용하기 때문에 아래와 같은 구조를 따릅니다.

보통의 경우는 segment 단위에서의 barrel file을 import해오는 것이 convention이나,
tree-shaking에 좋지 않은 영향을 끼치기 때문에 지키지 않습니다.

```text
├── app/                                    # Next.js app router 엔트리 포인트
├── src/
│   ├── app/                                # FSD app layer (앱 설정, providers)
│   ├── entities/                           # 핵심 비즈니스 도메인 모델 (타 도메인에서 공개 API 모듈을 통해 공유 가능)
│   │   └── domain/                         # 특정 도메인 API 및 서비스 로직
│   │       ├── @x/                         # 공개 API 모듈
│   │       │   └── other-domain.ts
│   │       ├── domain.interface.ts         # Type 정의 (Data, DTO, API Schema 등)
│   │       ├── domain.mutations.ts         # Client-side mutation 서비스 (create, update, delete)
│   │       ├── domain.server.ts            # Server-side GET 서비스 (apiServer 활용)
│   │       ├── domain.server-mutations.ts  # Server-side mutation 서비스
│   │       └── domain.queries.ts           # Query-key factory 기반 쿼리 키 및 GET 서비스 정의
│   ├── features/                           # 독립적 기능 단위 (로그인 폼, 카드 드래그 등)
│   ├── views/                              # Page 단위 (FSD Page Layer, UI 조합 중심)
│   ├── widgets/                            # 복합 UI 컴포넌트 (엔티티 + 기능 조합)
│   └── shared/                             # 재사용 가능한 유틸, 라이브러리, 디자인 시스템
```

## 관련 ESLint 설정

**단방향 의존성**을 지키기 위해 상위 레이어를 참조 혹은 임포트할 수 없도록 **import/no-restricted-paths** rule을 사용합니다.

```js
"import/no-restricted-paths": [
  "error",
  {
    zones: [
      {
        target: "./src/views",
        from: "./src/app",
      },
      {
        target: "./src/widgets",
        from: ["./src/app", "./src/views"],
      },
      {
        target: "./src/features",
        from: ["./src/app", "./src/views", "./src/widgets"],
      },
      {
        target: "./src/entities",
        from: ["./src/app", "./src/views", "./src/widgets", "./src/features"],
      },
      {
        target: "./src/shared",
        from: ["./src/app", "./src/views", "./src/widgets", "./src/features", "./src/entities"],
      },
    ],
  },
],
```

**import/order** rule을 사용하여 import 순서를 관리합니다. 이는 코드의 가독성을 높이고, 모듈 간의 의존성을 명확히 합니다.

```js
"import/order": [
  "error",
  {
    groups: [["builtin", "external"], ["internal", "parent", "sibling"], ["index", "object", "type"], "unknown"],
    pathGroups: [
      {
        pattern: "{react,react-dom}",
        group: "external",
        position: "before",
      },
      {
        pattern: "{next,next/**}",
        group: "external",
        position: "before",
      },
      {
        pattern: "{@/app/**,@/app}",
        group: "internal",
        position: "before",
      },
      {
        pattern: "{@/views/**,@/views}",
        group: "internal",
        position: "before",
      },
      {
        pattern: "{@/widgets/**,@/widgets}",
        group: "internal",
        position: "before",
      },
      {
        pattern: "{@/features/**,@/features}",
        group: "internal",
        position: "before",
      },
      {
        pattern: "{@/entities/**,@/entities}",
        group: "internal",
        position: "before",
      },
      {
        pattern: "{@/shared/**,@/shared}",
        group: "internal",
        position: "before",
      },
      {
        pattern: "{./*.module.scss,../**/*.module.scss,./*.scss,../**/*.scss}",
        group: "unknown",
      },
    ],
    pathGroupsExcludedImportTypes: ["@/**", "src/**", "public/**"],
    "newlines-between": "always",
    alphabetize: {
      order: "asc",
      caseInsensitive: true,
    },
  },
],
```
