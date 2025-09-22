import { RefObject, useEffect, useRef, useState } from "react";

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

const useIntersectionObserver = <T extends HTMLElement = HTMLElement>({
  root = null,
  rootMargin = "0px",
  threshold = 0,
  disabled = false,
}: IntersectionObserverOptions = {}) => {
  const [intersectionInfo, setIntersectionInfo] = useState<IntersectionInfo>({
    isIntersecting: false,
    intersectionRatio: 0,
    intersectionRect: null,
    boundingClientRect: null,
    rootBounds: null,
  });

  const ref = useRef<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (disabled) return;

    const rootElement = root && "current" in root ? root.current : root;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersectionInfo({
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
          intersectionRect: entry.intersectionRect,
          boundingClientRect: entry.boundingClientRect,
          rootBounds: entry.rootBounds,
        });
      },
      {
        root: rootElement,
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);
    observerRef.current = observer;

    return () => {
      observer.unobserve(element);
      observerRef.current = null;
    };
  }, [root, rootMargin, threshold, disabled]);

  const disconnect = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  };

  return {
    ref,
    ...intersectionInfo,
    disconnect,
  };
};

export default useIntersectionObserver;
