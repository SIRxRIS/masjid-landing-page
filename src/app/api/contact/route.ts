import { sendEmail } from "@/utils/email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, phone, message } = await req.json();

    // Send email
    await sendEmail({
      to: "masjidjawahiruzzarqa17@gmail.com", // Email tujuan
      subject: `Pesan dari ${fullName}`,
      html: `
        <h2>Pesan Baru dari Form Kontak</h2>
        <p><strong>Nama:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telepon:</strong> ${phone}</p>
        <p><strong>Pesan:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
