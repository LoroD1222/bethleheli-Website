import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const web3FormsEndpoint = "https://api.web3forms.com/submit";

function field(data: Record<string, unknown>, key: string, maxLength = 200) {
  const value = data[key];
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
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
  const kind = data.kind;
  const name = field(data, "name", 120);
  const email = field(data, "email", 254);
  const contactMessage = field(data, "message", 5000);
  if ((kind !== "contact" && kind !== "trip") || !name || !emailPattern.test(email) || (kind === "contact" && !contactMessage)) {
    return NextResponse.json({ message: "Please complete the required fields with a valid email address." }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json({ message: "Enquiries cannot be sent yet. Please connect Web3Forms before publishing." }, { status: 503 });
  }

  const submission: Record<string, string> = {
    access_key: accessKey,
    subject: kind === "contact" ? "New contact enquiry | Betheli Expeditions" : "New trip request | Betheli Expeditions",
    from_name: "Betheli Expeditions Website",
    name,
    email,
    message: kind === "contact" ? contactMessage : field(data, "notes", 5000) || "Please contact me about a Tanzania trip.",
  };

  if (kind === "contact") {
    submission.topic = field(data, "topic", 100);
  } else {
    for (const key of ["interest", "dateStyle", "dateFlexibility", "arrival", "departure", "timing", "adults", "children", "days", "travelStyle", "whatsapp", "country"] as const) {
      submission[key] = field(data, key);
    }
  }

  try {
    const response = await fetch(web3FormsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(submission),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const result: unknown = await response.json().catch(() => null);
    const success = result && typeof result === "object" && "success" in result && result.success === true;
    if (!response.ok || !success) {
      return NextResponse.json({ message: response.status === 429 ? "Too many requests. Please try again shortly." : "Your enquiry could not be sent. Please try again later." }, { status: response.status === 429 ? 429 : 502 });
    }
    return NextResponse.json({ message: "Your enquiry was sent. The team will be in touch." });
  } catch {
    return NextResponse.json({ message: "Your enquiry could not be sent. Please try again later." }, { status: 502 });
  }
}
