import Image from "next/image";
import Link from "next/link";
import { productHref, type Product } from "@/lib/eshop/catalogue";
import AddToBasketButton from "./AddToBasketButton";

export default function ProductCard({ product }: { product: Product }) {
  const href = productHref(product.id);

  return (
    <article className="flex flex-col overflow-hidden rounded-[26px] border border-brand-border bg-white shadow-card">
      <Link
        href={href}
        prefetch={false}
        className="relative aspect-square overflow-hidden border-b border-brand-border bg-slate-50"
        aria-label={`View ${product.name}`}
      >
        <Image
          src={product.image}
          alt=""
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
          className="object-contain"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="flex-1 text-base font-extrabold leading-snug text-brand-navy">
          <Link href={href} prefetch={false} className="hover:underline">{product.name}</Link>
        </h3>
        <p className="mt-3 font-extrabold text-brand-navy">{product.price}</p>
        <div className="mt-4">
          <AddToBasketButton id={product.id} name={product.name} size="sm" />
        </div>
      </div>
    </article>
  );
}
