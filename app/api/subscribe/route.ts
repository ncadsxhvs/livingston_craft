import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate required field
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
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
      subject: "New Newsletter Subscription - Livingston Craft",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #755344;">New Newsletter Subscription</h2>

          <div style="background-color: #f9f6f1; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p style="margin: 0; font-size: 16px;"><strong>Email:</strong> ${email}</p>
          </div>

          <p style="color: #666; font-size: 14px; margin-top: 24px;">
            Subscribed on: ${new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>

          <hr style="margin: 24px 0; border: none; border-top: 1px solid #e3e3e3;">

          <p style="color: #666; font-size: 14px;">
            This subscription was submitted from your Livingston Craft website.
          </p>
        </div>
      `,
    };

    // Confirmation email to subscriber
    const emailToSubscriber = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Welcome to Livingston Craft Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #755344 0%, #513c33 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300;">Welcome to Livingston Craft</h1>
          </div>

          <div style="padding: 32px 20px;">
            <p style="font-size: 18px; color: #333; margin-bottom: 20px;">Thank you for subscribing!</p>

            <p style="color: #666; line-height: 1.6;">
              You're now part of the Livingston Craft community. Get ready to receive:
            </p>

            <ul style="color: #666; line-height: 1.8; margin: 20px 0;">
              <li>Exclusive offers and promotions</li>
              <li>New product launches</li>
              <li>Design inspiration and flooring tips</li>
              <li>Expert advice from our team</li>
            </ul>

            <div style="background-color: #f9f6f1; padding: 20px; border-radius: 8px; margin: 24px 0;">
              <p style="margin: 0; color: #755344; font-weight: 600;">
                💡 Pro Tip: Add us to your contacts to ensure you never miss our emails!
              </p>
            </div>

            <p style="color: #666; line-height: 1.6;">
              Questions? Simply reply to this email - we're here to help.
            </p>

            <p style="margin-top: 32px; color: #666;">
              Best regards,<br>
              <strong style="color: #755344;">The Livingston Craft Team</strong>
            </p>
          </div>

          <div style="background-color: #f9f6f1; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              <strong>Livingston Craft</strong><br>
              Premium Flooring Solutions
            </p>
            <p style="color: #999; font-size: 12px; margin: 16px 0 0 0;">
              You're receiving this because you subscribed to our newsletter.<br>
              Don't want these emails? You can unsubscribe at any time.
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(emailToOwner);
    await transporter.sendMail(emailToSubscriber);

    return NextResponse.json(
      { message: "Subscription successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing subscription:", error);
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}
