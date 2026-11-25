"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getProduct } from "./catalogue";

type Cart = Record<string, number>;

const storageKey = "wegrow-eshop-basket";
const changeEvent = "wegrow-basket-change";
const emptyCart = "{}";
let inMemoryCart: string | null = null;

function readSnapshot() {
  if (inMemoryCart !== null) return inMemoryCart;
  try {
    return window.localStorage.getItem(storageKey) ?? emptyCart;
  } catch {
    return emptyCart;
  }
}

function readServerSnapshot() {
  return emptyCart;
}

function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, listener);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, listener);
  };
}

function parseCart(snapshot: string): Cart {
  try {
    const saved: unknown = JSON.parse(snapshot);
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {};

    return Object.fromEntries(
      Object.entries(saved).filter(([id, quantity]) =>
        getProduct(id) && Number.isSafeInteger(quantity) && quantity > 0,
      ),
    );
  } catch {
    return {};
  }
}

export function cartQuantity(cart: Cart, id: string) {
  return Object.hasOwn(cart, id) ? cart[id] : 0;
}

function writeCart(cart: Cart) {
  const snapshot = JSON.stringify(cart);
  try {
    window.localStorage.setItem(storageKey, snapshot);
    inMemoryCart = null;
  } catch {
    inMemoryCart = snapshot;
  }
  window.dispatchEvent(new Event(changeEvent));
}

export function useCart() {
  const snapshot = useSyncExternalStore(subscribe, readSnapshot, readServerSnapshot);
  return useMemo(() => parseCart(snapshot), [snapshot]);
}

export function changeCartQuantity(id: string, difference: number) {
  if (!getProduct(id)) return;
  const cart = parseCart(readSnapshot());
  const quantity = cartQuantity(cart, id) + difference;
  if (!Number.isSafeInteger(quantity) || quantity < 1) return;

  writeCart({ ...cart, [id]: quantity });
}

export function removeCartItem(id: string) {
  const cart = parseCart(readSnapshot());
  delete cart[id];
  writeCart(cart);
}
