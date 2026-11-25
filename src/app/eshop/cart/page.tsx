import type { Metadata } from "next";
import Container from "@/components/common/Container";
import BasketContents from "@/components/eshop/BasketContents";

export const metadata: Metadata = {
  title: "Basket",
  robots: { index: false, follow: true },
};

export default function BasketPage() {
  return (
    <Container className="pb-16 pt-8 sm:pt-12">
      <h1 className="mb-6 text-3xl font-extrabold text-brand-navy sm:text-4xl">Your basket</h1>
      <BasketContents />
    </Container>
  );
}
