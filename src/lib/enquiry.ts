export async function sendEnquiry(kind: "contact" | "trip", form: HTMLFormElement, extras: Record<string, string> = {}) {
  const fields = Object.fromEntries(new FormData(form).entries());
  try {
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...fields, ...extras, kind }),
    });
    const result: { message?: string } = await response.json();
    return { ok: response.ok, message: result.message || "Your enquiry could not be sent. Please try again later." };
  } catch {
    return { ok: false, message: "Your enquiry could not be sent. Please try again later." };
  }
}
