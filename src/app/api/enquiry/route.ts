import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
  const data = payload as Record<string, unknown>;
  const kind = data.kind;
  const name = data.name;
  const email = data.email;
  if ((kind !== "contact" && kind !== "trip") || typeof name !== "string" || !name.trim() || typeof email !== "string" || !emailPattern.test(email) || (kind === "contact" && (typeof data.message !== "string" || !data.message.trim()))) {
    return NextResponse.json({ message: "Please complete the required fields with a valid email address." }, { status: 400 });
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ message: "Enquiries cannot be sent yet. Please connect an enquiry service before publishing." }, { status: 503 });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Webhook response ${response.status}`);
    return NextResponse.json({ message: "Your enquiry was sent. The team will be in touch." });
  } catch {
    return NextResponse.json({ message: "Your enquiry could not be sent. Please try again later." }, { status: 502 });
  }
}
