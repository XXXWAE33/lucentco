import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  suburb?: string;
  service?: string;
  message?: string;
};

const isStubKey = (key?: string) =>
  !key || key.includes("stub") || key === "re_stub_key_replace_me";

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, message } = body;

  // Minimal server-side validation.
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Please include your name, email and a message." },
      { status: 422 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 422 },
    );
  }

  const summary = [
    `Name: ${name}`,
    `Email: ${email}`,
    body.phone ? `Phone: ${body.phone}` : null,
    body.suburb ? `Suburb: ${body.suburb}` : null,
    body.service ? `Service: ${body.service}` : null,
    "",
    body.message,
  ]
    .filter(Boolean)
    .join("\n");

  // Stub mode — no real key configured. Log and succeed so the UX works in dev.
  const apiKey = process.env.RESEND_API_KEY;
  if (isStubKey(apiKey)) {
    console.info(
      "[contact] Stub mode (no Resend key). Enquiry received:\n" + summary,
    );
    return NextResponse.json({ ok: true, stub: true });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `${site.name} <contact@velorabrisbane.com>`,
      to: process.env.CONTACT_TO_EMAIL ?? site.email,
      reply_to: email,
      subject: `New enquiry from ${name}${body.suburb ? ` (${body.suburb})` : ""}`,
      text: summary,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Resend send failed:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please call us." },
      { status: 502 },
    );
  }
}
