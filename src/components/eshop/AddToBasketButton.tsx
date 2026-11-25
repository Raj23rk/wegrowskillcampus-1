"use client";

import Button from "@/components/common/Button";
import { cartQuantity, changeCartQuantity, useCart } from "@/lib/eshop/cart";

export default function AddToBasketButton({
  id,
  name,
  size = "md",
}: {
  id: string;
  name: string;
  size?: "sm" | "md";
}) {
  const cart = useCart();
  const quantity = cartQuantity(cart, id);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <Button size={size} ariaLabel={`Add ${name} to basket`} onClick={() => changeCartQuantity(id, 1)}>
        Add to basket
      </Button>
      <span role="status" className="text-sm text-brand-textSecondary">
        {quantity > 0 ? `In basket: ${quantity}` : ""}
      </span>
    </div>
  );
}


