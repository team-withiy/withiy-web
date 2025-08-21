# Authorization System

HOC(Higher-Order Component) 패턴과 선언적 컴포넌트를 활용하여 확장 가능하고 재사용 가능한 인증 시스템을 구축했습니다.

## 개요

기존의 각 페이지마다 반복되는 인증 로직을 해결하고, 일관된 사용자 경험을 제공하기 위해 두 가지 주요 패턴으로 인증 시스템을 설계했습니다.

- **HOC 패턴**: 페이지 레벨에서 인증 요구사항을 선언적으로 정의
- **Wrapper 컴포넌트**: 컴포넌트 레벨에서 조건부 인증 처리

## 아키텍처

### 파일 구조

```text
src/features/
├── handleAuthorizationRoute/           # HOC 패턴 구현
│   └── ui/
│       ├── withAuthorizationRoute.tsx
│       ├── AuthorizationRouteHandler.tsx
│       └── authorizationRoute.interface.ts
└── checkAuthorization/                # 선언적 컴포넌트 구현
    ├── api/
    │   └── checkAuthorization.mutations.ts
    └── ui/
        ├── RequireAuthorizationWrapper.tsx
        ├── RequireAuthorizationButton.tsx
        ├── RequireAuthorizationBottomSheet.tsx
        ├── RequireCoupleAuthorizationWrapper.tsx
        ├── RequireCoupleAuthorizationButton.tsx
        └── RequireCoupleAuthorizationBottomSheet.tsx
```

### 1. HOC 패턴 (withAuthorizationRoute)

페이지 컴포넌트를 감싸서 인증 로직을 주입하는 High-Order Component입니다.
`AuthorizationRouteHandler`는 페이지 컴포넌트와 병렬적으로 렌더링되어 인증 로직을 백그라운드에서 처리하므로, 정상적으로 페이지에 접근하는 사용자의 UX를 전혀 해치지 않습니다.

```typescript
// withAuthorizationRoute.tsx
const withAuthorizationRoute = <P extends object>(
  WrappedComponent: ComponentType<P>,
  config: AuthorizationConfig
) => {
  const WithAuthorizationRoute = (props: P) => {
    return (
      <>
        <WrappedComponent {...props} />  {/* 메인 컨텐츠 먼저 렌더링 */}
        <AuthorizationRouteHandler {...config} />  {/* 백그라운드 인증 체크 */}
      </>
    );
  };

  WithAuthorizationRoute.displayName = `WithAuthorizationRoute(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuthorizationRoute;
};
```

#### AuthorizationRouteHandler의 동작 방식

```typescript
// AuthorizationRouteHandler.tsx
const AuthorizationRouteHandler = ({ requiredAuth, requiredCouple, isRegisterPage, isRestorePage }) => {
  const { data, isFetched } = useQuery({ ...userQueries.getMe, throwOnError: false });
  const { replace } = useRouter();

  useEffect(() => {
    if (!isFetched) return; // 데이터 로딩 완료까지 대기

    // 백그라운드에서 인증 상태 검증
    if (requiredAuth === true && !data) throw new Error(UNAUTHORIZED_MESSAGE);
    if (requiredAuth === false && !!data) throw new Error(FORBIDDEN_MESSAGE);

    // 추가 인증 로직들...
  }, [data, isFetched /* ... */]);

  return null; // UI 렌더링 없음 - 순수 로직만 담당
};
```

#### 인증 설정 인터페이스

```typescript
// authorizationRoute.interface.ts
export interface AuthorizationConfig {
  requiredAuth?: boolean;
  requiredCouple?: boolean;
  isRestorePage?: boolean;
  isRegisterPage?: boolean;
}
```

#### 적용 예시

```typescript
// 페이지 컴포넌트
function MyPage() {
  return <div>Private Content</div>;
}

// HOC 적용
export default withAuthorizationRoute(MyPage, {
  requiredAuth: true
});
```

### 2. 선언적 컴포넌트 (RequireAuthorizationWrapper)

컴포넌트 레벨에서 조건부 인증 처리를 담당하는 래퍼 컴포넌트입니다.

```typescript
// RequireAuthorizationWrapper.tsx
type HasBottomSheetProps = {
  hasBottomSheet: true;
  callbackUrl: string;
};

type NoBottomSheetProps = {
  hasBottomSheet: false;
};

type BottomSheetProps = HasBottomSheetProps | NoBottomSheetProps;

type Props = BottomSheetProps & {
  fallback?: ReactNode;
  children?: ReactNode;
  fallbackWrapperClassName?: string;
};

export default function RequireAuthorizationWrapper({
  fallback,
  children,
  fallbackWrapperClassName,
  ...props
}: Props) {
  return (
    <SSRSafeSuspense fallback={fallback ?? children}>
      <QueryBoundary queries={[userQueries.getMe]}>
        {([{ data: me }]) => (
          <>
            {me?.data && children}
            {!me?.data && props.hasBottomSheet && (
              <RequireAuthorizationButton
                className={fallbackWrapperClassName}
                callbackUrl={props.callbackUrl}
              >
                {fallback ?? children}
              </RequireAuthorizationButton>
            )}
            {!me?.data && !props.hasBottomSheet && (fallback ?? children)}
          </>
        )}
      </QueryBoundary>
    </SSRSafeSuspense>
  );
}
```

#### 사용 예시

```typescript
// 컴포넌트 레벨 인증
function HomePage() {
  return (
    <main>
      <RequireAuthorizationWrapper
        fallback={<GuestScheduleCard />}
        callbackUrl="/schedules/create"
        hasBottomSheet={true}
      >
        <AuthenticatedScheduleCard />
      </RequireAuthorizationWrapper>
    </main>
  );
}
```

## 핵심 기능

### 1. 타입 안전한 조건부 Props

Union 타입을 활용하여 `hasBottomSheet` 값에 따라 `callbackUrl`의 필수 여부를 컴파일 타임에 강제합니다.
`callbackUrl`은 사용자가 인증을 완료한 후 원래 접근하려던 기능이나 페이지로 돌아갈 수 있도록 하는 핵심 매개변수입니다.

```typescript
// hasBottomSheet가 true인 경우 callbackUrl 필수
<RequireAuthorizationWrapper
  hasBottomSheet={true}
  callbackUrl="/premium-feature"  // 로그인 후 프리미엄 기능 페이지로 이동
>
  <Content />
</RequireAuthorizationWrapper>

// hasBottomSheet가 false인 경우 callbackUrl 불필요
<RequireAuthorizationWrapper
  hasBottomSheet={false}
  // callbackUrl 불필요 - 즉시 폴백 UI 표시
>
  <Content />
</RequireAuthorizationWrapper>
```

### 2. 바텀시트 상호작용 패턴

비인증 사용자가 보호된 콘텐츠를 클릭했을 때 바텀시트를 통해 자연스럽게 인증을 유도합니다.
`callbackUrl`은 사용자가 바텀시트를 통해 로그인을 완료한 후 원래 접근하려던 페이지로 자동 리디렉션하는 역할을 합니다.

```typescript
// RequireAuthorizationButton.tsx
const RequireAuthorizationButton = ({ children, callbackUrl }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div onClick={() => setIsShow(true)} role="button">
        {children}  {/* 기존 UI 그대로 표시 */}
      </div>

      <RequireAuthorizationBottomSheet
        isShow={isShow}
        onClose={() => setIsShow(false)}
        callbackUrl={callbackUrl}  // 로그인 후 돌아올 페이지
      />
    </>
  );
};
```

### 3. React Query와 Suspense 통합

데이터 페칭과 UI 상태 관리를 최적화하여 일관된 로딩 상태를 제공합니다.

```typescript
<SSRSafeSuspense fallback={fallback ?? children}>
  <QueryBoundary queries={[userQueries.getMe]}>
    {([{ data: me }]) => (
      // 인증 상태에 따른 조건부 렌더링
    )}
  </QueryBoundary>
</SSRSafeSuspense>
```

## 사용 사례

### 페이지 레벨 인증

```typescript
// 로그인이 필요한 페이지
export default withAuthorizationRoute(MyPage, {
  requiredAuth: true,
});

// 커플 연결이 필요한 페이지
export default withAuthorizationRoute(CouplePage, {
  requiredAuth: true,
  requiredCouple: true,
});

// 계정 복구 페이지
export default withAuthorizationRoute(RestorePage, {
  requiredAuth: true,
  isRestorePage: true,
});

// 회원가입 페이지
export default withAuthorizationRoute(RegisterPage, {
  requiredAuth: false,
  isRegisterPage: true,
});
```

### 컴포넌트 레벨 조건부 인증

```typescript
// 바텀시트를 통한 인증 유도
<RequireAuthorizationWrapper
  fallback={<LoginPrompt />}
  callbackUrl="/premium-feature"
  hasBottomSheet={true}
>
  <PremiumFeatureComponent />
</RequireAuthorizationWrapper>

// 즉시 폴백 UI 표시
<RequireAuthorizationWrapper
  fallback={<PublicAlternative />}
  hasBottomSheet={false}
>
  <PrivateContent />
</RequireAuthorizationWrapper>
```

### 커플 인증 전용 래퍼

```typescript
// 커플 연결 상태 확인
<RequireCoupleAuthorizationWrapper
  fallback={<ConnectCouplePrompt />}
  callbackUrl="/couples/invite"
  hasBottomSheet={true}
>
  <CoupleOnlyFeature />
</RequireCoupleAuthorizationWrapper>
```

## 장점

### 1. 관심사 분리

- 비즈니스 로직과 인증 로직의 완전한 분리
- 컴포넌트는 순수한 UI 렌더링에만 집중

### 2. 비침습적 UX (Non-intrusive User Experience)

- `AuthorizationRouteHandler`가 백그라운드에서 병렬적으로 실행
- 정상적인 사용자의 페이지 접근 UX를 전혀 방해하지 않음
- 메인 컨텐츠가 먼저 렌더링되고, 인증 체크는 별도로 진행

### 3. 코드 재사용성

- 동일한 인증 로직을 여러 컴포넌트/페이지에서 재사용
- HOC를 통한 횡단 관심사(Cross-cutting Concerns) 처리

### 4. 타입 안전성

- TypeScript를 활용한 컴파일 타임 검증
- Union 타입으로 조건부 Props 강제

### 5. 일관된 사용자 경험

- 통일된 바텀시트 플로우
- 표준화된 로딩 및 에러 처리

### 6. 확장성

- 새로운 인증 요구사항 추가 용이
- 기존 코드 수정 최소화

## 테스트

각 컴포넌트는 단위 테스트와 통합 테스트를 통해 검증됩니다.

```typescript
// RequireAuthorizationWrapper.test.tsx
test("인증된 사용자에게는 children을 렌더링해야 함", () => {
  mockUser({ authenticated: true });

  render(
    <RequireAuthorizationWrapper hasBottomSheet={false}>
      <div>Private Content</div>
    </RequireAuthorizationWrapper>
  );

  expect(screen.getByText("Private Content")).toBeInTheDocument();
});

test("비인증 사용자에게는 fallback을 렌더링해야 함", () => {
  mockUser({ authenticated: false });

  render(
    <RequireAuthorizationWrapper
      fallback={<div>Please Login</div>}
      hasBottomSheet={false}
    >
      <div>Private Content</div>
    </RequireAuthorizationWrapper>
  );

  expect(screen.getByText("Please Login")).toBeInTheDocument();
});
```

## 성능 최적화

- **SSR 안전 Suspense**: hydration 최적화
- **React Query 캐싱**: 중복 요청 방지
- **조건부 렌더링**: 불필요한 컴포넌트 마운트 방지
- **Portal 기반 바텀시트**: 렌더링 트리 최적화

이 인증 시스템을 통해 개발 생산성과 코드 품질을 동시에 향상시킬 수 있으며, 확장 가능한 아키텍처를 구축할 수 있습니다.
