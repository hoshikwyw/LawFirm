"use client";

import { useState } from "react";

const MESSENGER_PAGE_ID = process.env.NEXT_PUBLIC_MESSENGER_PAGE_ID;
const MESSENGER_URL = MESSENGER_PAGE_ID
  ? `https://m.me/${MESSENGER_PAGE_ID}`
  : null;

export function ChatFloatingButton() {
  const [hovered, setHovered] = useState(false);

  const href = MESSENGER_URL ?? "#contact";
  const label = MESSENGER_URL
    ? "Message us on Messenger"
    : "Contact us";

  return (
    <a
      href={href}
      target={MESSENGER_URL ? "_blank" : undefined}
      rel={MESSENGER_URL ? "noopener noreferrer" : undefined}
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-muted-gold text-soft-bone shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-muted-gold focus:ring-offset-2"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        className="size-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17v3.54l3.02-1.66c.81.22 1.66.34 2.54.34 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm0 17.52c-.75 0-1.48-.1-2.17-.3l-1.55.85.41-1.75c-1.4-1-2.29-2.56-2.29-4.32C6.4 7.05 8.94 4.5 12 4.5s5.6 2.55 5.6 5.7c0 3.15-2.5 5.72-5.6 5.72z" />
      </svg>
      {hovered && (
        <span className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-deep-charcoal px-3 py-2 font-sans text-xs font-medium text-soft-bone shadow-md">
          {label}
        </span>
      )}
    </a>
  );
}
