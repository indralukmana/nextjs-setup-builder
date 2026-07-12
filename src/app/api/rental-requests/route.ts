import { NextResponse } from "next/server";

import {
  createRentalRequestId,
  isValidRentalSetup,
  rentalRequestSchema,
} from "@/lib/rental-request";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = rentalRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  if (!isValidRentalSetup(parsed.data)) {
    return NextResponse.json({ error: "invalid_setup" }, { status: 400 });
  }

  const requestId = createRentalRequestId();
  console.info(
    JSON.stringify({
      type: "rental-request",
      requestId,
      ...parsed.data,
    }),
  );

  return NextResponse.json({ requestId }, { status: 200 });
}
