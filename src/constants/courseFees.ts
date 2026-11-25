import amounts from "../../data/course-fees.json";

const fees: Record<string, number | null> = amounts;

const formatGBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export function getCourseFee(courseId: string) {
  const amount = fees[courseId];
  return typeof amount === "number" ? formatGBP.format(amount).replace(/\.00$/, "") : null;
}
