import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, city, state, zip, message, productName } = body;

    // Validate required fields
    if (!name || !email || !address || !city || !state || !zip) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email to you (business owner)
    const emailToOwner = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to yourself
      subject: `New Sample Request${productName ? ` - ${productName}` : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #755344;">New Sample Request</h2>
          ${productName ? `<p><strong>Product:</strong> ${productName}</p>` : ""}

          <h3 style="color: #755344; margin-top: 24px;">Customer Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e3e3e3;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e3e3e3;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e3e3e3;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e3e3e3;">${email}</td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e3e3e3;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e3e3e3;">${phone}</td>
            </tr>
            ` : ""}
          </table>

          <h3 style="color: #755344; margin-top: 24px;">Shipping Address</h3>
          <p style="margin: 8px 0;">
            ${address}<br>
            ${city}, ${state} ${zip}
          </p>

          ${message ? `
          <h3 style="color: #755344; margin-top: 24px;">Additional Notes</h3>
          <p style="margin: 8px 0; padding: 12px; background-color: #f9f6f1; border-radius: 8px;">
            ${message}
          </p>
          ` : ""}

          <p style="margin-top: 32px; color: #666; font-size: 14px;">
            This request was submitted from your Livingston Craft website.
          </p>
        </div>
      `,
    };

    // Confirmation email to customer
    const emailToCustomer = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Thank You for Your Sample Request - Livingston Craft",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #755344;">Thank You for Your Interest!</h2>
          <p>Hi ${name},</p>
          <p>We've received your request for free samples${productName ? ` of ${productName}` : ""} and will be shipping them to:</p>

          <div style="background-color: #f9f6f1; padding: 16px; border-radius: 8px; margin: 16px 0;">
            ${address}<br>
            ${city}, ${state} ${zip}
          </div>

          <p>Your samples should arrive within 5-7 business days. If you have any questions in the meantime, feel free to reply to this email.</p>

          <p style="margin-top: 24px;">Best regards,<br><strong>The Livingston Craft Team</strong></p>

          <hr style="margin: 32px 0; border: none; border-top: 1px solid #e3e3e3;">

          <p style="color: #666; font-size: 14px;">
            <strong>Livingston Craft</strong><br>
            Premium Flooring Solutions<br>
            Transform Your Space
          </p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(emailToOwner);
    await transporter.sendMail(emailToCustomer);

    return NextResponse.json(
      { message: "Sample request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to submit sample request" },
      { status: 500 }
    );
  }
}
