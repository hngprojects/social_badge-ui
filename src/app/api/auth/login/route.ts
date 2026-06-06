import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_INTERNAL_URL;

export async function POST(request: NextRequest) {
  if (!API_BASE) {
    return NextResponse.json(
      { message: "API_INTERNAL_URL is not configured" },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error("[login route] upstream fetch failed:", err);
    return NextResponse.json(
      { message: "Could not reach auth service" },
      { status: 502 },
    );
  }

  const data = await upstream.json();

  if (!upstream.ok) {
    return NextResponse.json(data, { status: upstream.status });
  }

  const response = NextResponse.json(data, { status: 200 });

  const upstreamCookies = upstream.headers.getSetCookie?.() ?? [];

  for (const raw of upstreamCookies) {
    const eqIndex = raw.indexOf("=");
    const name = raw.slice(0, eqIndex).trim();
    const rest = raw.slice(eqIndex + 1);
    const value = rest.split(";")[0].trim();

    const maxAgeMatch = raw.match(/Max-Age=(\d+)/i);
    const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1]) : undefined;

    response.cookies.set({
      name,
      value,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      ...(maxAge !== undefined ? { maxAge } : {}),
    });
  }

  return response;
}
