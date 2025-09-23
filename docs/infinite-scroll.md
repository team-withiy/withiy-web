# Infinite Scroll

## 목차

- [개요](#개요)
- [Hooks](#hooks)
  - [useIntersectionObserver](#useintersectionobserver)
  - [useCursorPaginationQuery](#usecursorpaginationquery)
  - [useSuspenseCursorPaginationQuery](#usesuspensecursorpaginationquery)
- [Components](#components)
  - [InfiniteScroll 구조](#infinitescroll-구조)
  - [Boundary Components](#boundary-components)
  - [Container Components](#container-components)
  - [EmptyErrorBoundary](#emptyerrorboundary)
- [사용 예시](#사용-예시)

## 개요

이 프로젝트의 무한 스크롤 기능은 커서 기반 페이지네이션을 사용하여 구현되었습니다.  
Intersection Observer API를 활용한 스크롤 감지와 TanStack Query의 Infinite Query를 조합하여  
성능 최적화된 무한 스크롤을 제공합니다.

## Hooks

### useIntersectionObserver

Intersection Observer API를 래핑한 React Hook으로, 요소가 뷰포트와 교차하는지 감지합니다.

#### 타입 정의

```typescript
interface IntersectionObserverOptions extends Omit<IntersectionObserverInit, "root"> {
  root?: Element | Document | RefObject<HTMLElement | null> | null;
  /** observer 비활성화 여부 */
  disabled?: boolean;
}

interface IntersectionInfo {
  /** 요소가 root와 교차하고 있는지 여부 */
  isIntersecting: boolean;
  /** 교차 비율 (0.0 ~ 1.0) */
  intersectionRatio: number;
  /** 교차 영역의 정보 */
  intersectionRect: DOMRectReadOnly | null;
  /** 대상 요소의 경계 정보 */
  boundingClientRect: DOMRectReadOnly | null;
  /** root 요소의 경계 정보 */
  rootBounds: DOMRectReadOnly | null;
}
```

#### 사용 방법

```typescript
const { ref, isIntersecting, disconnect } = useIntersectionObserver({
  threshold: 0.1,
  rootMargin: "100px",
  disabled: false,
});
```

#### 주요 기능

- **TypeScript 제네릭 지원**: 요소 타입을 명시할 수 있습니다
- **Ref 객체 지원**: root 옵션에 RefObject를 전달할 수 있습니다
- **비활성화 옵션**: disabled 옵션으로 observer를 임시 비활성화할 수 있습니다
- **수동 해제**: disconnect 메서드로 observer를 수동으로 해제할 수 있습니다

### useCursorPaginationQuery

커서 기반 페이지네이션을 위한 TanStack Query의 useInfiniteQuery 래퍼입니다.

#### API 정의

```typescript
export type UseCursorPaginationQueryOptions<T, QueryKey extends readonly unknown[]> = Omit<
  UndefinedInitialDataInfiniteOptions<
    CursorPaginationResponseDTO<T>,
    DefaultError,
    InfiniteDataWithMeta<T>,
    QueryKey,
    CursorPageParam
  >,
  "queryFn" | "initialPageParam" | "getNextPageParam" | "getPreviousPageParam"
> & {
  queryFn: QueryFunction<CursorPaginationResponseDTO<T>, QueryKey>;
  initialPageParam?: CursorPageParam;
};

export type UseCursorPaginationQueryResult<T> = UseInfiniteQueryResult<InfiniteDataWithMeta<T>, DefaultError>;
```

#### 핵심 기능

- **메타데이터 메모이제이션**: 페이지 변경 시 메타데이터를 메모이제이션하여 성능을 최적화합니다
- **양방향 페이지네이션**: 다음/이전 페이지 모두 지원합니다
- **평면화된 데이터**: 모든 페이지의 데이터를 하나의 배열로 평면화하여 제공합니다

### useSuspenseCursorPaginationQuery

Suspense를 지원하는 커서 기반 페이지네이션 Hook입니다.

#### 주요 특징

- **Suspense 지원**: React Suspense와 완전히 호환됩니다
- **Error Boundary 지원**: 에러 발생 시 Error Boundary에서 처리됩니다
- **기본 기능**: `useCursorPaginationQuery`와 동일한 기능을 제공합니다

## Components

### InfiniteScroll 구조

무한 스크롤 컴포넌트는 Boundary와 Container로 분리된 구조를 가집니다:

```typescript
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
```

### Boundary Components

#### SuspenseCursorVerticalInfiniteScrollBoundary

Suspense를 지원하는 무한 스크롤의 데이터 fetching을 담당하는 경계 컴포넌트입니다.

**Props:**

```typescript
interface Props<T, QueryKey extends readonly unknown[]> {
  query: UseSuspenseCursorPaginationQueryOptions<T, QueryKey>;
  children: (props: UseSuspenseCursorPaginationQueryResult<T>) => React.ReactNode;
}
```

**역할:**

- 커서 기반 페이지네이션 쿼리 실행
- 쿼리 결과를 children에 전달
- Suspense와 Error Boundary 지원

#### CursorVerticalInfiniteScrollBoundary

일반적인 무한 스크롤의 데이터 fetching을 담당하는 경계 컴포넌트입니다.

**Props:**

```typescript
interface Props<T, QueryKey extends readonly unknown[]> {
  query: UseCursorPaginationQueryOptions<T, QueryKey>;
  children: (props: UseCursorPaginationQueryResult<T>) => React.ReactNode;
}
```

### Container Components

#### SuspenseCursorVerticalInfiniteScrollContainer

무한 스크롤의 UI 렌더링과 스크롤 감지를 담당하는 컨테이너 컴포넌트입니다.

**Props:**

```typescript
interface Props<T> {
  data: InfiniteDataWithMeta<T>;
  throwOnEmpty?: boolean;
  children: React.ReactNode;
  className?: string;
  elementType: ElementType;
  rootMargin?: string;
  loadingElements?: React.ReactNode;
  isElementRoot?: boolean;
  blockObservePrevIntersect?: boolean;
  blockObserveNextIntersect?: boolean;
  // 추가 쿼리 정보들
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFetchingNextPage: boolean;
  isFetchingPreviousPage: boolean;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
}
```

**역할:**

- 실제 DOM 요소 렌더링
- Intersection Observer를 통한 스크롤 감지
- 로딩 상태 표시
- 빈 데이터 처리

### EmptyErrorBoundary

빈 데이터 상태를 처리하기 위한 Error Boundary입니다.

#### 사용 예시

```typescript
import { InfiniteScroll } from "@/shared/ui/InfiniteScroll";
import { folderQueries } from "@/entities/folder/api/folder.queries";

// EmptyBoundary는 새로운 구조에서 Boundary 내부에서 사용됩니다
function ExampleComponent() {
  return (
    <InfiniteScroll.Suspense.Cursor.Vertical.Boundary
      query={folderQueries.paginateBookmarkedPlaces}
    >
      {({ data, ...queryInfo }) => (
        <InfiniteScroll.EmptyBoundary fallback={<div>데이터가 없습니다</div>}>
          <InfiniteScroll.Suspense.Cursor.Vertical.Container
            data={data}
            elementType="div"
            throwOnEmpty
            {...queryInfo}
          >
            {data.data.map((item) => (
              <div key={item.placeId}>{item.placeName}</div>
            ))}
          </InfiniteScroll.Suspense.Cursor.Vertical.Container>
        </InfiniteScroll.EmptyBoundary>
      )}
    </InfiniteScroll.Suspense.Cursor.Vertical.Boundary>
  );
}
```

#### 동작 방식

- **EmptyError 감지**: `EmptyError` 클래스만 처리하고, 다른 에러는 상위로 전파합니다
- **폴백 UI**: 빈 데이터 시 표시할 UI를 지정할 수 있습니다

## 실제 사용 예시

### 기본 사용법 (새로운 구조)

```typescript
import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";
import { InfiniteScroll } from "@/shared/ui/InfiniteScroll";
import { folderQueries } from "@/entities/folder/api/folder.queries";
import EmptyBookmark from "@/widgets/EmptyBookmark/ui";
import PlaceItem from "@/widgets/PlaceItem/ui";
import Button from "@/shared/ui/Button/Button";

function BookmarkPlacesList() {
  return (
    <InfiniteScroll.Suspense.Cursor.Vertical.Boundary
      query={folderQueries.paginateBookmarkedPlaces}
    >
      {({ data, ...queryInfo }) => (
        <InfiniteScroll.EmptyBoundary fallback={<EmptyBookmark type="folder" />}>
          <Button type="button" size={36} full variant="outline">
            데이트 일정 만들기
          </Button>
          <InfiniteScroll.Suspense.Cursor.Vertical.Container
            data={data}
            elementType="ul"
            isElementRoot
            className="places-list"
            throwOnEmpty
            loadingElements={range(10).map((value) => (
              <Skeleton
                key={value}
                containerClassName="loading-container"
                className="loading-item"
              />
            ))}
            {...queryInfo}
          >
            {data.data.map((place) => (
              <PlaceItem key={place.placeId} place={place} />
            ))}
          </InfiniteScroll.Suspense.Cursor.Vertical.Container>
        </InfiniteScroll.EmptyBoundary>
      )}
    </InfiniteScroll.Suspense.Cursor.Vertical.Boundary>
  );
}
```

### Suspense 사용법 (업데이트된 구조)

```typescript
import { Suspense } from "react";
import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";
import { InfiniteScroll } from "@/shared/ui/InfiniteScroll";
import { folderQueries } from "@/entities/folder/api/folder.queries";

function BookmarkPlacesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InfiniteScroll.Suspense.Cursor.Vertical.Boundary
        query={folderQueries.paginateBookmarkedPlaces}
      >
        {({ data, ...queryInfo }) => (
          <InfiniteScroll.Suspense.Cursor.Vertical.Container
            data={data}
            elementType="ul"
            className="places-list"
            loadingElements={range(5).map((value) => (
              <Skeleton key={value} height={200} />
            ))}
            {...queryInfo}
          >
            {data.data.map((place) => (
              <div key={place.placeId}>{place.placeName}</div>
            ))}
          </InfiniteScroll.Suspense.Cursor.Vertical.Container>
        )}
      </InfiniteScroll.Suspense.Cursor.Vertical.Boundary>
    </Suspense>
  );
}
```

### 특정 폴더의 장소 목록 (새로운 패턴)

```typescript
import { InfiniteScroll } from "@/shared/ui/InfiniteScroll";
import { folderQueries } from "@/entities/folder/api/folder.queries";

function FolderPlacesList({ folderId }: { folderId: number }) {
  return (
    <InfiniteScroll.Cursor.Vertical.Boundary
      query={folderQueries.paginateFolderPlaces(folderId)}
    >
      {({ data, ...queryInfo }) => (
        <InfiniteScroll.EmptyBoundary
          fallback={<div>이 폴더에 저장된 장소가 없습니다.</div>}
        >
          <InfiniteScroll.Cursor.Vertical.Container
            data={data}
            elementType="div"
            className="folder-places-list"
            throwOnEmpty
            loadingElements={
              <div className="loading">장소를 불러오는 중...</div>
            }
            {...queryInfo}
          >
            {data.data.map((place) => (
              <div key={place.placeId} className="place-item">
                {place.placeName}
              </div>
            ))}
          </InfiniteScroll.Cursor.Vertical.Container>
        </InfiniteScroll.EmptyBoundary>
      )}
    </InfiniteScroll.Cursor.Vertical.Boundary>
  );
}
```
