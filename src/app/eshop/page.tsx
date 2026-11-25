import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import PageHero from "@/components/common/PageHero";
import BasketLink from "@/components/eshop/BasketLink";
import ProductCard from "@/components/eshop/ProductCard";
import { priceInMinorUnits, products } from "@/lib/eshop/catalogue";

export const metadata: Metadata = {
  title: "E-shop",
  description: "Browse downloadable study guides, workbooks, templates and project kits from WeGrow Skill Campus.",
  alternates: { canonical: "/eshop" },
};

type ShopParams = Promise<Record<string, string | string[] | undefined>>;

const outlineLink = "inline-flex items-center justify-center gap-2 rounded border border-brand-blue px-4 py-2 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";
const productsPerPage = 16;
const sortLabels = {
  name: "Name A–Z",
  "price-asc": "Price low to high",
  "price-desc": "Price high to low",
} as const;
const compareNames = new Intl.Collator("en-GB", { sensitivity: "base", numeric: true }).compare;

export default async function EshopPage({ searchParams }: { searchParams: ShopParams }) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";
  const sort = typeof params.sort === "string" && Object.hasOwn(sortLabels, params.sort)
    ? params.sort as keyof typeof sortLabels
    : "name";
  const searchTerm = query.toLocaleLowerCase("en-GB");
  const matchingProducts = products.filter(({ name }) =>
    name.toLocaleLowerCase("en-GB").includes(searchTerm),
  );
  matchingProducts.sort((a, b) => {
    if (sort === "name") return compareNames(a.name, b.name);

    const difference = priceInMinorUnits(a.price) - priceInMinorUnits(b.price);
    return (sort === "price-asc" ? difference : -difference) || compareNames(a.name, b.name);
  });
  const totalPages = Math.max(1, Math.ceil(matchingProducts.length / productsPerPage));
  const requestedPage = typeof params.page === "string" ? Number(params.page) : 1;
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0
    ? Math.min(requestedPage, totalPages)
    : 1;
  const offset = (page - 1) * productsPerPage;
  const visibleProducts = matchingProducts.slice(offset, offset + productsPerPage);

  function pageHref(pageNumber: number) {
    const search = new URLSearchParams();
    if (query) search.set("q", query);
    if (sort !== "name") search.set("sort", sort);
    if (pageNumber > 1) search.set("page", String(pageNumber));
    return search.size > 0 ? `/eshop?${search}` : "/eshop";
  }

  return (
    <div className="bg-brand-bg pb-16 sm:pb-20">
      <PageHero
        eyebrow="WeGrow Skill Campus UK"
        title="E-shop"
        description="Browse downloadable workbooks, study guides, templates and project kits to build and practise your skills."
        image="/difference/industry-training.jpg"
        imageAlt="Learner practising technical skills on a laptop"
      />

      <Container>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold text-brand-navy sm:text-3xl">Shop learning resources</h2>
          <BasketLink />
        </div>

        <form action="/eshop" method="get" className="mb-6 flex flex-col gap-3 rounded-2xl border border-brand-border bg-white p-4 sm:flex-row sm:items-end sm:p-5">
          <div className="min-w-0 flex-1">
            <label htmlFor="shop-search" className="mb-1.5 block text-sm font-semibold text-brand-navy">Search products</label>
            <input
              id="shop-search"
              name="q"
              type="search"
              maxLength={100}
              defaultValue={query}
              placeholder="e.g. Excel"
              className="w-full rounded-lg border border-brand-border px-3 py-2.5 text-sm text-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
            />
          </div>
          <div>
            <label htmlFor="shop-sort" className="mb-1.5 block text-sm font-semibold text-brand-navy">Sort by</label>
            <select
              id="shop-sort"
              name="sort"
              defaultValue={sort}
              className="w-full rounded-lg border border-brand-border bg-white px-3 py-2.5 text-sm text-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
            >
              {Object.entries(sortLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <Button type="submit">Apply</Button>
        </form>

        {visibleProducts.length === 0 ? (
          <div className="rounded-2xl border border-brand-border bg-white p-8 text-center">
            <p className="mb-4 text-brand-textSecondary">No products found{query ? ` for “${query}”` : ""}.</p>
            <Button href="/eshop" variant="outline">Browse all products</Button>
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-brand-textSecondary">
              Showing {offset + 1}–{offset + visibleProducts.length} of {matchingProducts.length} products
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {totalPages > 1 && (
              <nav aria-label="Shop pages" className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-brand-textSecondary">
                {page > 1 && (
                  <Link href={pageHref(page - 1)} className={outlineLink}>
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Previous
                  </Link>
                )}
                <span>Page {page} of {totalPages}</span>
                {page < totalPages && (
                  <Link href={pageHref(page + 1)} className={outlineLink}>
                    Next <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
