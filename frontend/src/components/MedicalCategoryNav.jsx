import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { medicalCategories } from "../mock/mock";

// Reusable "All Medical Products" cross-navigation.
// Desktop: wrapped pill row. Mobile/tablet: horizontally scrollable row.
// The active category (activeSlug) is highlighted.
export default function MedicalCategoryNav({ activeSlug }) {
  const activeRef = useRef(null);

  useEffect(() => {
    // Bring the active pill into view on mobile horizontal scroll.
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeSlug]);

  return (
    <div className="rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-100">
      <div className="mb-3 px-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
        All Medical Products
      </div>
      <div className="flex gap-2.5 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible medcat-scroll">
        {medicalCategories.map((c) => {
          const active = c.slug === activeSlug;
          return (
            <Link
              key={c.slug}
              ref={active ? activeRef : null}
              to={`/${c.slug}`}
              aria-current={active ? "page" : undefined}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-[var(--brand)] text-white shadow-md shadow-red-600/25"
                  : "bg-white text-[var(--ink)] ring-1 ring-gray-200 hover:bg-[var(--brand)] hover:text-white"
              }`}
            >
              {c.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
