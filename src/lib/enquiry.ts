type SubmissionResult = { ok: boolean; message: string };
type PortalResult = { ok: boolean; skipped?: boolean; error?: string };

const fallbackError = "Your enquiry could not be sent. Please try again later.";
const successMessage = "Your enquiry was sent. The team will be in touch.";

function stringFields(form: HTMLFormElement) {
  return Object.fromEntries(
    Array.from(new FormData(form).entries()).map(([key, value]) => [key, typeof value === "string" ? value.trim() : ""]),
  );
}

function storedTracking() {
  try {
    const stored = JSON.parse(sessionStorage.getItem("utm") || "{}") as unknown;
    if (!stored || typeof stored !== "object" || Array.isArray(stored)) return {};
    return Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign", "fbclid"]
        .map(key => [key, (stored as Record<string, unknown>)[key]])
        .filter((entry): entry is [string, string] => typeof entry[1] === "string" && entry[1].length > 0),
    );
  } catch {
    return {};
  }
}

function portalPayload(fields: Record<string, string>, extras: Record<string, string>, key: string) {
  const email = fields.email;
  const phone = fields.phone || fields.whatsapp;
  const interestedIn = extras.interest || extras.topic || fields.interested_in || fields.interest || fields.topic;
  const explicitDates = [fields.arrival, fields.departure].filter(Boolean).join(" to ");
  const travelDates = extras.timing || explicitDates || fields.timing || extras.departure || fields.dateStyle || fields.dateFlexibility;
  const travellerParts = [
    fields.adults && `${fields.adults} ${fields.adults === "1" ? "adult" : "adults"}`,
    fields.children && `${fields.children} ${fields.children === "1" ? "child" : "children"}`,
  ].filter(Boolean);

  const optional = {
    email,
    phone,
    interested_in: interestedIn,
    travel_dates: travelDates,
    travellers: travellerParts.join(", "),
    country: fields.country,
    message: fields.message || fields.notes,
    ...storedTracking(),
  };

  return {
    key,
    name: fields.name,
    _gotcha: fields._gotcha || "",
    ...Object.fromEntries(Object.entries(optional).filter(([, value]) => value)),
  };
}

async function sendToPortal(fields: Record<string, string>, extras: Record<string, string>): Promise<PortalResult> {
  const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL;
  const portalKey = process.env.NEXT_PUBLIC_PORTAL_FORM_KEY;
  if (!portalUrl || !portalKey) return { ok: false, skipped: true };

  try {
    const response = await fetch(`${portalUrl.replace(/\/$/, "")}/api/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(portalPayload(fields, extras, portalKey)),
      signal: AbortSignal.timeout(10000),
    });
    const result: unknown = await response.json().catch(() => null);
    const error = result && typeof result === "object" && "error" in result && typeof result.error === "string" ? result.error : undefined;
    return { ok: response.ok, error };
  } catch {
    return { ok: false };
  }
}

async function sendExistingEnquiry(kind: "contact" | "trip", fields: Record<string, string>, extras: Record<string, string>): Promise<SubmissionResult> {
  try {
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...fields, ...extras, kind }),
    });
    const result: { message?: string } = await response.json();
    return { ok: response.ok, message: result.message || fallbackError };
  } catch {
    return { ok: false, message: fallbackError };
  }
}

export async function sendEnquiry(kind: "contact" | "trip", form: HTMLFormElement, extras: Record<string, string> = {}) {
  const fields = stringFields(form);
  const [existing, portal] = await Promise.all([
    sendExistingEnquiry(kind, fields, extras),
    sendToPortal(fields, extras),
  ]);

  if (existing.ok) return existing;
  if (portal.ok) return { ok: true, message: successMessage };
  if (!portal.skipped && portal.error) return { ok: false, message: portal.error };
  return existing;
}
