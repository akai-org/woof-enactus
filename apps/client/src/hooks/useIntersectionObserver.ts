import type { RefObject } from "react";
import { useEffect } from "react";

export interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface UseIntersectionObserverProps {
  target: RefObject<Element | null>;
  onIntersect: () => void;
  enabled?: boolean;
  options?: IntersectionObserverOptions;
}

function useIntersectionObserver({
  target,
  onIntersect,
  enabled = true,
  options = {
    rootMargin: "200px",
    threshold: 0.1,
  },
}: UseIntersectionObserverProps) {
  useEffect(() => {
    if (!enabled || !target.current) return;

    const observer = new IntersectionObserver(entries => {
      const [entry] = entries;
      if (entry?.isIntersecting) {
        onIntersect();
      }
    }, options);

    observer.observe(target.current);
    return () => observer.disconnect();
  }, [target, enabled, options, onIntersect]);
}

export default useIntersectionObserver;
