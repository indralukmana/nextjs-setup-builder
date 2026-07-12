"use client";

import { useReportWebVitals } from "next/web-vitals";

function reportMetric(metric: {
  id: string;
  name: string;
  value: number;
  rating?: string;
  navigationType?: string;
}) {
  if (process.env.NODE_ENV === "development") {
    console.info("[web-vital]", metric.name, Math.round(metric.value), metric.rating);
    return;
  }

  const body = JSON.stringify(metric);
  const url = "/api/web-vitals";

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    navigator.sendBeacon(url, body);
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
