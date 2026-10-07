import { useEffect, useRef } from "react";
import { animate, inView } from "motion";
import { useReducedMotion } from "motion/react";

const revealSelectors = [
  ".hero-checks",
  ".dashboard-wrap",
  ".partners > p",
  ".partner-logos > span",
  ".section-heading",
  ".feature-card",
  ".simulation-copy",
  ".simulation-panel",
  ".workflow-grid > article",
  ".trust-strip",
  ".pricing-card",
  ".faq-layout > div:first-child",
  ".faq-item",
  ".cta-box",
].join(",");

/** Reveal once on entry, without changing layout or hiding focused content. */
export function useAppearAnimation() {
  const scope = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = scope.current;
    if (!root || reducedMotion || !window.IntersectionObserver) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>(revealSelectors));
    const stops: (() => void)[] = [];
    const running: ReturnType<typeof animate>[] = [];
    const revealed = new Set<HTMLElement>();

    for (const element of targets) {
      const siblings = Array.from(element.parentElement?.children ?? []).filter(
        (child) => targets.includes(child as HTMLElement),
      );
      const index = siblings.indexOf(element);
      const delay = element.matches(".dashboard-wrap")
        ? 0.45
        : element.matches(".hero-checks")
          ? 0.35
          : Math.min(Math.max(index, 0) * 0.09, 0.27);

      element.style.opacity = "0";
      element.style.transform = "translateY(22px)";

      const reveal = () => {
        if (revealed.has(element)) return;
        revealed.add(element);
        const animation = animate(
          element,
          { opacity: [0, 1], transform: ["translateY(22px)", "translateY(0px)"] },
          { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
        );
        running.push(animation);
        void animation.then(() => {
          element.style.removeProperty("opacity");
          element.style.removeProperty("transform");
        });
      };

      stops.push(inView(element, reveal, { margin: "0px 0px -35px 0px" }));
      element.addEventListener("focusin", reveal);
      stops.push(() => element.removeEventListener("focusin", reveal));
    }

    return () => {
      stops.forEach((stop) => stop());
      running.forEach((animation) => animation.cancel());
      targets.forEach((element) => {
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
      });
    };
  }, [reducedMotion]);

  return scope;
}