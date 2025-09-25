import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
console.log(resend);

export const sendEmail = async (to, subject, html) => {
  try {
    await resend.emails.send({
      from: "Food App <onboarding@resend.dev>",
      to,
      subject,
      html,
    });
    console.log("✅ Email sent successfully!");
  } catch (error) {
    console.error("❌ Email error:", error);
  }
};
