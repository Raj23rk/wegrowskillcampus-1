import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Container from "@/components/common/Container";
import AddToBasketButton from "@/components/eshop/AddToBasketButton";
import BasketLink from "@/components/eshop/BasketLink";
import ProductCard from "@/components/eshop/ProductCard";
import { getProduct, productHref, products } from "@/lib/eshop/catalogue";

type ProductPageProps = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return {
    title: product.name,
    description: product.summary || `${product.name} is a digital learning resource from WeGrow Skill Campus UK.`,
    alternates: { canonical: productHref(product.id) },
    openGraph: { images: [product.image] },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const relatedProducts = [...new Set(product.relatedProductIds)]
    .filter((relatedId) => relatedId !== product.id)
    .map(getProduct)
    .filter((related) => related !== undefined);

  return (
    <Container className="pb-16 pt-8 sm:pt-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link href="/eshop" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to e-shop
        </Link>
        <BasketLink />
      </div>

      <div className="grid overflow-hidden rounded-[26px] border border-brand-border bg-white shadow-card md:grid-cols-2">
        <div className="relative aspect-square max-h-[34rem] border-b border-brand-border bg-slate-50 md:border-b-0 md:border-r">
          <Image
            src={product.image}
            alt=""
            fill
            priority
            sizes="(max-width: 767px) 100vw, (max-width: 1440px) 50vw, 680px"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-blue">Digital learning resource</p>
          <h1 className="text-3xl font-extrabold leading-tight text-brand-navy sm:text-4xl">{product.name}</h1>
          <p className="mt-5 text-2xl font-extrabold text-brand-navy">{product.price}</p>
          {product.summary && (
            <p className="mt-4 whitespace-pre-line leading-relaxed text-brand-textSecondary">{product.summary}</p>
          )}
          <div className="mt-7">
            <AddToBasketButton id={product.id} name={product.name} />
          </div>
        </div>
      </div>

      {product.description && (
        <section aria-labelledby="product-description" className="mt-8 rounded-[26px] border border-brand-border bg-white p-6 shadow-card sm:p-10">
          <h2 id="product-description" className="text-2xl font-extrabold text-brand-navy">Description</h2>
          <div className="mt-4 max-w-4xl space-y-4 leading-relaxed text-brand-textSecondary">
            {product.description.split(/\n\s*\n/).map((paragraph, index) => (
              <p key={index} className="whitespace-pre-line">{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section aria-labelledby="related-products" className="mt-10">
          <h2 id="related-products" className="mb-5 text-2xl font-extrabold text-brand-navy">Related products</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
