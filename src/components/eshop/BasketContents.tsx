"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import Button from "@/components/common/Button";
import { changeCartQuantity, removeCartItem, useCart } from "@/lib/eshop/cart";
import { formatPrice, getPriceCurrency, getProduct, priceInMinorUnits, productHref } from "@/lib/eshop/catalogue";

const quantityButton = "inline-flex h-9 w-9 items-center justify-center text-brand-blue hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40";

export default function BasketContents() {
  const cart = useCart();
  const items = Object.entries(cart).flatMap(([id, quantity]) => {
    const product = getProduct(id);
    return product ? [{
      product,
      quantity,
      lineTotal: priceInMinorUnits(product.price) * quantity,
      currency: getPriceCurrency(product.price),
    }] : [];
  });

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-brand-border bg-white p-8 text-center">
        <p className="mb-4 text-brand-textSecondary">Your basket is empty.</p>
        <Button href="/eshop">Browse products</Button>
      </div>
    );
  }

  const subtotals = new Map<string, number>();
  for (const { currency, lineTotal } of items) {
    subtotals.set(currency, (subtotals.get(currency) ?? 0) + lineTotal);
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <ul className="divide-y divide-brand-border rounded-2xl border border-brand-border bg-white">
        {items.map(({ product, quantity, lineTotal, currency }) => (
          <li key={product.id} className="grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-4 p-4 sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:p-5">
            <Link href={productHref(product.id)} className="relative aspect-square overflow-hidden rounded-lg bg-slate-50" aria-label={`View ${product.name}`}>
              <Image src={product.image} alt="" fill sizes="80px" className="object-contain" />
            </Link>
            <div>
              <Link href={productHref(product.id)} className="font-bold text-brand-navy hover:underline">{product.name}</Link>
              <p className="mt-1 text-sm text-brand-textSecondary">{product.price} each</p>
            </div>
            <div className="col-span-2 flex flex-wrap items-center justify-between gap-3 sm:col-span-1 sm:justify-end">
              <div className="inline-flex items-center overflow-hidden rounded border border-brand-border">
                <button
                  type="button"
                  className={quantityButton}
                  disabled={quantity === 1}
                  aria-label={`Decrease quantity for ${product.name}`}
                  onClick={() => changeCartQuantity(product.id, -1)}
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <output className="min-w-9 text-center text-sm font-semibold text-brand-navy" aria-label={`Quantity for ${product.name}`}>{quantity}</output>
                <button
                  type="button"
                  className={quantityButton}
                  aria-label={`Increase quantity for ${product.name}`}
                  onClick={() => changeCartQuantity(product.id, 1)}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <p className="min-w-16 text-right font-extrabold tabular-nums text-brand-navy">{formatPrice(lineTotal, currency)}</p>
              <button
                type="button"
                className="text-sm text-brand-blue underline hover:text-brand-navy"
                aria-label={`Remove ${product.name} from basket`}
                onClick={() => removeCartItem(product.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <aside className="rounded-2xl border border-brand-border bg-white p-5">
        <h2 className="text-lg font-extrabold text-brand-navy">Basket summary</h2>
        <div className="my-4 flex items-center justify-between gap-3 border-t border-brand-border pt-4">
          <span className="text-brand-textSecondary">Subtotal</span>
          <output className="text-right text-xl font-extrabold tabular-nums text-brand-navy" aria-label="Basket subtotal">
            {Array.from(subtotals, ([currency, amount]) => (
              <span key={currency} className="block">{formatPrice(amount, currency)}</span>
            ))}
          </output>
        </div>
        <Button href="/eshop" variant="outline" className="w-full">Continue shopping</Button>
      </aside>
    </div>
  );
}
