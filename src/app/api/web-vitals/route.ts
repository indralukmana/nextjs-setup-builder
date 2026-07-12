import { NextResponse } from "next/server";

/** Accepts browser web-vital beacons. No-op sink for local/prod without an analytics backend. */
export async function POST(request: Request) {
  try {
    await request.text();
  } catch {
    // ignore malformed bodies
  }

  return new NextResponse(null, { status: 204 });
}
