import { NextResponse } from "next/server";

import { env } from "@/env";
import { webVitalMetricSchema } from "@/lib/web-vitals";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const parsed = webVitalMetricSchema.safeParse(body);
  if (!parsed.success) {
    return new NextResponse(null, { status: 400 });
  }

  const metric = parsed.data;
  console.info(
    JSON.stringify({
      type: "web-vital",
      ...metric,
    }),
  );

  const webhookUrl = env.WEB_VITALS_WEBHOOK_URL;
  if (webhookUrl) {
    void fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metric),
    }).catch(() => {
      // Ignore webhook delivery failures.
    });
  }

  return new NextResponse(null, { status: 204 });
}
