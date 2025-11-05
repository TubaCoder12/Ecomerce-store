

import dotenv from "dotenv";
dotenv.config();
import { Resend } from "resend";

const resend = new Resend("re_jhyKCyqc_JskMgiLYF2Ceoa9h8PH2becg");
console.log(resend);

export const sendEmail = async (to, subject, html) => {
  try {
    await resend.emails.send({
      from: "Food App <onboarding@resend.dev>",
      to,
      subject,
      html,
    });
   
  } catch (error) {
    console.error(" Email error:", error);
  }
};
