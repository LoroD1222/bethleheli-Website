import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

const graphApiVersion = "v27.0";
const fallbackPixelId = "1445827243777951";

function field(data: Record<string, unknown>, key: string, maxLength: number) {
  const value = data[key];
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function hashed(value: string) {
  return value ? [hash(value)] : undefined;
}

function normalizedPhone(value: string) {
  return value.replace(/\D/g, "");
}

function names(value: string) {
  const parts = value.toLocaleLowerCase("en").split(/\s+/).filter(Boolean);
  return { first: parts[0] || "", last: parts.length > 1 ? parts.at(-1) || "" : "" };
}

export async function POST(request: Request) {
  const accessToken = process.env.META_CONVERSIONS_API_ACCESS_TOKEN;
  const pixelId = process.env.META_PIXEL_ID || fallbackPixelId;
  if (!accessToken) return NextResponse.json({ message: "Conversions API is not configured." }, { status: 503 });

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const data = payload as Record<string, unknown>;
  const eventId = field(data, "eventId", 120);
  const eventSourceUrl = field(data, "eventSourceUrl", 2048);
  const email = field(data, "email", 254).toLocaleLowerCase("en");
  const phone = normalizedPhone(field(data, "phone", 40));
  const name = names(field(data, "name", 120));
  const fbp = field(data, "fbp", 255);
  const fbc = field(data, "fbc", 255);

  let sourceUrl: URL;
  try {
    sourceUrl = new URL(eventSourceUrl);
  } catch {
    return NextResponse.json({ message: "Invalid event source." }, { status: 400 });
  }
  if (!eventId || sourceUrl.origin !== new URL(request.url).origin) {
    return NextResponse.json({ message: "Invalid event source." }, { status: 400 });
  }

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const userData = {
    em: hashed(email),
    ph: hashed(phone),
    fn: hashed(name.first),
    ln: hashed(name.last),
    client_ip_address: forwardedFor || request.headers.get("x-real-ip") || undefined,
    client_user_agent: request.headers.get("user-agent") || undefined,
    fbp: fbp || undefined,
    fbc: fbc || undefined,
  };

  const metaResponse = await fetch(`https://graph.facebook.com/${graphApiVersion}/${encodeURIComponent(pixelId)}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [{
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: sourceUrl.toString(),
        user_data: userData,
      }],
      access_token: accessToken,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  }).catch(() => null);

  if (!metaResponse?.ok) {
    return NextResponse.json({ message: "Meta did not accept the event." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
