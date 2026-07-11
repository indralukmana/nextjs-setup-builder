import { getProductById } from "@/data/catalog";

export function getWeeklyTotal(productIds: string[]) {
  return productIds.reduce((total, id) => {
    const product = getProductById(id);
    return total + (product?.pricePerWeek ?? 0);
  }, 0);
}

export function getRentalTotal(weeklyTotal: number, weeks: number) {
  return weeklyTotal * weeks;
}

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
