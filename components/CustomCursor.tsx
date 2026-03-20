"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const CLICKABLE_SELECTOR =
  'a, button, [role="button"], input[type="submit"], input[type="button"], [data-cursor-clickable]';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOverClickable, setIsOverClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Detect touch device once on mount using a ref to avoid deps array size changes
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice.current) return;

    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest(CLICKABLE_SELECTOR)) {
        setIsOverClickable(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement;
      if (!related?.closest(CLICKABLE_SELECTOR) && !target?.closest(CLICKABLE_SELECTOR)) {
        setIsOverClickable(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  if (!isVisible || isTouchDevice.current) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      aria-hidden
      style={{ left: 0, top: 0 }}
    >
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-muted-gold bg-muted-gold/20"
        style={{
          left: position.x,
          top: position.y,
        }}
        animate={{
          width: isOverClickable ? 48 : 12,
          height: isOverClickable ? 48 : 12,
          opacity: isOverClickable ? 1 : 0.6,
        }}
        transition={{
          type: "spring",
          damping: 22,
          stiffness: 280,
          opacity: { duration: 0.15 },
        }}
      />
    </div>
  );
}
