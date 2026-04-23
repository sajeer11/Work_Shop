import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type RegisterPayload = {
  fullName?: string;
  email?: string;
  contactNumber?: string;
  age?: string;
  currentStatus?: string;
  reason?: string;
  quickUnderstanding?: string;
  quickUnderstandingOther?: string;
  exploredField?: "yes" | "no" | "";
  previousExperience?: string;
  seatPrice?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhoneNumber(value: string) {
  return /^\d{11}$/.test(value);
}

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function requireAnyEnv(names: string[]) {
  for (const name of names) {
    const value = process.env[name];

    if (value) {
      return value;
    }
  }

  throw new Error(`Missing required environment variable. Tried: ${names.join(", ")}`);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterPayload;

    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const contactNumber = body.contactNumber?.trim() ?? "";
    const age = body.age?.trim() ?? "";
    const currentStatus = body.currentStatus?.trim() ?? "";
    const reason = body.reason?.trim() ?? "";
    const quickUnderstanding = body.quickUnderstanding?.trim() ?? "";
    const quickUnderstandingOther = body.quickUnderstandingOther?.trim() ?? "";
    const exploredField = body.exploredField ?? "";
    const previousExperience = body.previousExperience?.trim() ?? "";
    const seatPrice = body.seatPrice?.trim() ?? "";

    if (!fullName || !email || !contactNumber || !age || !currentStatus || !reason || !quickUnderstanding || !exploredField) {
      return NextResponse.json({ message: "Missing required form fields." }, { status: 400 });
    }

    if (quickUnderstanding === "Other" && !quickUnderstandingOther) {
      return NextResponse.json({ message: "Please specify your reason." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
    }

    if (!isValidPhoneNumber(contactNumber)) {
      return NextResponse.json({ message: "Invalid phone number." }, { status: 400 });
    }

    if (!/^\d{1,3}$/.test(age) || Number(age) < 1 || Number(age) > 120) {
      return NextResponse.json({ message: "Invalid age." }, { status: 400 });
    }

    const host = requireEnv("SMTP_HOST");
    const port = Number(requireEnv("SMTP_PORT"));
    const user = requireEnv("SMTP_USER");
    const pass = requireAnyEnv(["SMTP_PASS", "SMTPPASS"]);
    const from = requireEnv("SMTP_FROM");
    const to = requireEnv("SMTP_TO");
    const secure = process.env.SMTP_SECURE === "true" || port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    const exploredLabel = exploredField === "yes" ? "Yes" : "No";
    const quickUnderstandingLabel =
      quickUnderstanding === "Other" ? `Other - ${quickUnderstandingOther}` : quickUnderstanding;
    const workshopLabel = "Munneb Workshop | Brand Republic";

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `[${workshopLabel}] Registration - ${fullName}`,
      text: [
        `Source: ${workshopLabel}`,
        "A new workshop reservation was submitted.",
        "",
        `Full Name: ${fullName}`,
        `Email: ${email}`,
        `Contact Number: ${contactNumber}`,
        `Age: ${age}`,
        `Current Status: ${currentStatus}`,
        `Seat Price: ${seatPrice || "N/A"}`,
        "",
        `Why do you want to attend?: ${reason}`,
        `Quick Understanding: ${quickUnderstandingLabel}`,
        `Explored this field before?: ${exploredLabel}`,
        `Previous experience: ${previousExperience || "Not provided"}`,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #111;">
          <h2>New workshop reservation</h2>
          <p>A new workshop reservation was submitted.</p>
          <table cellpadding="8" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tr><td><strong>Source</strong></td><td>${workshopLabel}</td></tr>
            <tr><td><strong>Full Name</strong></td><td>${fullName}</td></tr>
            <tr><td><strong>Email</strong></td><td>${email}</td></tr>
            <tr><td><strong>Contact Number</strong></td><td>${contactNumber}</td></tr>
            <tr><td><strong>Age</strong></td><td>${age}</td></tr>
            <tr><td><strong>Current Status</strong></td><td>${currentStatus}</td></tr>
            <tr><td><strong>Seat Price</strong></td><td>${seatPrice || "N/A"}</td></tr>
            <tr><td><strong>Explored this field before?</strong></td><td>${exploredLabel}</td></tr>
            <tr><td valign="top"><strong>Why do you want to attend?</strong></td><td>${reason}</td></tr>
            <tr><td valign="top"><strong>Quick Understanding</strong></td><td>${quickUnderstandingLabel}</td></tr>
            <tr><td valign="top"><strong>Previous experience</strong></td><td>${previousExperience || "Not provided"}</td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send registration email", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to send registration email right now.",
      },
      { status: 500 },
    );
  }
}
