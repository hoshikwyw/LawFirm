"use server";

const RESEND_API_URL = "https://api.resend.com/emails";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

export type SendEmailState =
  | { success: true; message: string }
  | { success: false; message: string };

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendEmail(
  _prevState: SendEmailState | null,
  formData: FormData
): Promise<SendEmailState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const legalInquiry = formData.get("legalInquiry")?.toString().trim();
  const disclaimerAccepted = formData.get("disclaimer") === "on";

  if (!name) {
    return { success: false, message: "Name is required." };
  }
  if (!email) {
    return { success: false, message: "Email is required." };
  }
  if (!legalInquiry) {
    return { success: false, message: "Legal inquiry is required." };
  }
  if (!disclaimerAccepted) {
    return {
      success: false,
      message: "You must accept the legal disclaimer to submit.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RESEND_TO_EMAIL;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return {
      success: false,
      message: "Email service is not configured. Please try again later.",
    };
  }
  if (!toEmail) {
    console.error("RESEND_TO_EMAIL is not set.");
    return {
      success: false,
      message: "Email delivery is not configured. Please try again later.",
    };
  }

  const textBody = `Name: ${name}\nEmail: ${email}\n\nLegal inquiry:\n${legalInquiry}`;
  const htmlBody = `
    <h2>New legal inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <h3>Legal inquiry</h3>
    <p>${escapeHtml(legalInquiry).replace(/\n/g, "<br>")}</p>
  `;

  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: toEmail,
        reply_to: email,
        subject: `Legal inquiry from ${name}`,
        text: textBody,
        html: htmlBody,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("Resend API error:", res.status, data);
      const message =
        typeof data.message === "string"
          ? data.message
          : "Failed to send message. Please try again.";
      return { success: false, message };
    }

    return {
      success: true,
      message: "Your message has been sent. We will be in touch shortly.",
    };
  } catch (err) {
    console.error("Send email error:", err);
    return {
      success: false,
      message:
        "An error occurred while sending your message. Please try again.",
    };
  }
}
