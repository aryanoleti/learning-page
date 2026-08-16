"use client";

import Link from "next/link";
import { FEATURE_REQUIREMENTS } from "@/lib/learn/curriculum";
import { appUrl, ROUTES } from "@/lib/learn/links";

/* Persistent bar across the course.

   The tools listed here live in StockSense, which is a separate site. This
   course cannot lock or unlock them — browsers scope localStorage per origin,
   so progress recorded here is invisible over there. Rather than show a lock
   that does nothing, each tool simply says which level explains it. */
export function LearnTopBar() {
  const tools = Object.entries(FEATURE_REQUIREMENTS).map(([key, req]) => ({
    key,
    href: appUrl(`/${key}/`),
    label: req.label,
    level: req.level,
  }));

  return (
    <div className="sticky top-0 z-30 border-b border-(--color-border) bg-(--color-bg)/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-2.5 sm:px-6">
        <Link
          href={ROUTES.home}
          className="text-sm font-semibold tracking-tight text-(--color-fg) hover:text-(--color-brand-500)"
        >
          StockSense Learn
        </Link>

        <nav
          aria-label="Open StockSense"
          className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-1"
        >
          {tools.map((tool) => (
            <a
              key={tool.key}
              href={tool.href}
              title={`Covered in Level ${tool.level}`}
              className="text-xs font-medium text-(--color-fg-muted) hover:text-(--color-brand-500)"
            >
              {tool.label}
            </a>
          ))}
          <a
            href={appUrl("/dashboard/")}
            className="rounded-lg bg-(--color-brand-500) px-3 py-1.5 text-xs font-semibold text-white hover:bg-(--color-brand-600)"
          >
            Open StockSense →
          </a>
        </nav>
      </div>
    </div>
  );
}
