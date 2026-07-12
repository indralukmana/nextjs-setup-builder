import { z } from "zod";

export const webVitalMetricSchema = z.object({
  name: z.enum(["CLS", "FCP", "FID", "INP", "LCP", "TTFB"]),
  id: z.string().trim().min(1).max(120),
  value: z.number().finite(),
  rating: z.enum(["good", "needs-improvement", "poor"]).optional(),
  navigationType: z.string().trim().max(40).optional(),
  delta: z.number().finite().optional(),
});

export type WebVitalMetric = z.infer<typeof webVitalMetricSchema>;
