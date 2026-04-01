import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/schemas/booking";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    // Rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
    const { success } = rateLimit(`booking:${ip}`, {
      maxTokens: 3,
      refillInterval: 60_000,
    });
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate
    const body = await request.json();
    const result = bookingSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // If RESEND_API_KEY is configured, send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from:
              process.env.EMAIL_FROM || "Nicolas Navrozoglou <noreply@nicolas-navrozoglou.com>",
            to: [process.env.EMAIL_TO || "contact@dr-navrozoglou.be"],
            subject: `Nouvelle demande de rendez-vous - ${data.firstName} ${data.lastName}`,
            html: `
              <h2>Nouvelle demande de rendez-vous</h2>
              <table style="border-collapse: collapse; width: 100%;">
                <tr><td style="padding: 8px; font-weight: bold;">Service :</td><td style="padding: 8px;">${data.service}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Date :</td><td style="padding: 8px;">${data.date}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Heure :</td><td style="padding: 8px;">${data.time}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Nom :</td><td style="padding: 8px;">${data.firstName} ${data.lastName}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">E-mail :</td><td style="padding: 8px;">${data.email}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Téléphone :</td><td style="padding: 8px;">${data.phone}</td></tr>
                ${data.birthdate ? `<tr><td style="padding: 8px; font-weight: bold;">Date de naissance :</td><td style="padding: 8px;">${data.birthdate}</td></tr>` : ""}
                ${data.message ? `<tr><td style="padding: 8px; font-weight: bold;">Remarques :</td><td style="padding: 8px;">${data.message}</td></tr>` : ""}
              </table>
            `,
          }),
        });

        if (!res.ok) {
          console.error("[API] Resend email failed:", await res.text());
        }
      } catch (emailError) {
        console.error("[API] Email sending error:", emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.log("[API] No RESEND_API_KEY configured, skipping email send");
    }

    // Log the booking submission
    console.log("[API] Booking submission:", {
      service: data.service,
      date: data.date,
      time: data.time,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] POST /api/booking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
