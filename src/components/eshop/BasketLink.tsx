"use client";

import { ShoppingBasket } from "lucide-react";
import Button from "@/components/common/Button";
import { useCart } from "@/lib/eshop/cart";

export default function BasketLink({ compact = false }: { compact?: boolean }) {
  const cart = useCart();
  const quantity = Object.values(cart).reduce((sum, count) => sum + count, 0);

  return (
    <Button
      href="/eshop/cart"
      variant="outline"
      size={compact ? "sm" : "md"}
      className={compact ? "gap-1.5 rounded-xl tabular-nums" : "gap-2"}
      ariaLabel={compact ? `Basket, ${quantity} ${quantity === 1 ? "item" : "items"}` : undefined}
    >
      <ShoppingBasket className="h-4 w-4" aria-hidden="true" />
      {compact ? quantity : `Basket (${quantity})`}
    </Button>
  );
}
