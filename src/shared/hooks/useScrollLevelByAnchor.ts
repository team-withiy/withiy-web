import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

type ElementId = string;
type Element = RefObject<HTMLElement | null> | ElementId | HTMLElement;

interface Props {
  /** 스크롤 컨테이너 (기본값: document.documentElement) */
  container?: Element;
  /** 스크롤 대상 요소 */
  element: Element;
  /** 기준 요소 */
  anchor: Element;
}

const getElement = (element: Element) => {
  if (typeof element === "string") return document.getElementById(element);
  if (element instanceof HTMLElement) return element;
  return element.current;
};

/**
 * @name useScrollLevelByAnchor
 * @description 특정 element를 기준으로 얼마나 해당 요소가 지나갔는지를 반환하는 hook
 * requestAnimationFrame을 사용하여 성능 최적화된 스크롤 이벤트 처리
 *
 * @param {Props} props
 * @param {Element} [props.container] - 스크롤 컨테이너 (기본값: document.documentElement)
 * @param {Element} props.element - 스크롤 대상 요소
 * @param {Element} props.anchor - 기준 요소
 *
 * @returns {number} - 스크롤 레벨 0 ~ 100
 *
 * @example
 * ```tsx
 * const scrollLevel = useScrollLevelByAnchor({
 *   element: headerRef,
 *   anchor: sectionRef,
 *   container: containerRef
 * });
 * ```
 */
const useScrollLevelByAnchor = ({ element, anchor, container }: Props): number => {
  const [scrollLevel, setScrollLevel] = useState(0);
  const rafIdRef = useRef<number | undefined>(undefined);

  const calculateScrollLevel = useCallback(() => {
    const $element = getElement(element);
    const $anchor = getElement(anchor);

    if (!$element || !$anchor) return 0;

    const elementRect = $element.getBoundingClientRect();
    const anchorRect = $anchor.getBoundingClientRect();

    const anchorBottom = anchorRect.bottom;
    const elementBottom = elementRect.bottom;

    const isIntersected = anchorBottom <= elementBottom;
    if (!isIntersected) return 0;
    if (elementRect.height === 0) return 100;

    const level = Math.min(100, ((elementBottom - anchorBottom) / elementRect.height) * 100);
    return level;
  }, [element, anchor]);

  const handleScroll = useCallback(() => {
    rafIdRef.current = requestAnimationFrame(() => {
      const level = calculateScrollLevel();
      setScrollLevel(level);
    });
  }, [calculateScrollLevel]);

  useEffect(() => {
    const $container = container ? getElement(container) : window;

    if (!$container) return;

    handleScroll();

    $container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      $container.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [element, anchor, container, handleScroll]);

  return scrollLevel;
};

export default useScrollLevelByAnchor;
