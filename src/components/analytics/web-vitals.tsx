"use client";

import { useReportWebVitals } from "next/web-vitals";

function reportMetric(metric: {
  id: string;
  name: string;
  value: number;
  rating?: string;
  navigationType?: string;
  delta?: number;
}) {
  if (process.env.NODE_ENV === "development") {
    console.info("[web-vital]", metric.name, Math.round(metric.value), metric.rating);
  }

  const body = JSON.stringify(metric);
  const url = "/api/web-vitals";

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon(url, blob);
    return;
  }

  void fetch(url, {
    body,
    method: "POST",
    keepalive: true,
    headers: { "Content-Type": "application/json" },
  });
}

export function WebVitals() {
  useReportWebVitals(reportMetric);
  return null;
}
