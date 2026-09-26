import React from "react";
import { ArrowUpRight } from "lucide-react";

// Reusable Medical product card (B2B catalogue — no pricing / cart).
export default function MedicalProductCard({ product, onView }) {
  return (
    <div className="svc-card group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover" />
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--brand)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold uppercase leading-tight text-[var(--ink)] transition-colors group-hover:text-[var(--brand)]">
          {product.name}
        </h3>
        {product.productCode && (
          <div className="mt-1 text-xs font-medium text-[var(--ink-soft)]">{product.productCode}</div>
        )}
        {product.description && (
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{product.description}</p>
        )}
        {onView && (
          <button
            onClick={() => onView(product)}
            className="mt-4 inline-flex w-max items-center gap-1.5 text-sm font-semibold text-[var(--brand)] transition-transform duration-200 hover:translate-x-0.5"
          >
            View Details <ArrowUpRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
