import catalogue from "../../../data/products.json";

export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  summary?: string;
  description?: string;
  relatedProductIds?: string[];
};

export const products: Product[] = catalogue;

const productsById = new Map(products.map((product) => [product.id, product]));

export function getProduct(id: string) {
  return productsById.get(id);
}

export function productHref(id: string) {
  return `/eshop/${encodeURIComponent(id)}`;
}

export function priceInMinorUnits(price: string) {
  return Math.round(Number(price.replace(/[^\d.]/g, "")) * 100);
}

const currencies = { "£": "GBP", "€": "EUR", "$": "USD" } as const;

export function getPriceCurrency(price: string) {
  return currencies[price.trim()[0] as keyof typeof currencies] ?? "GBP";
}

export function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(amount / 100);
}
