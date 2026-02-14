import {Resend} from "resend";
import "dotenv/config";
import { ENV } from "./env.js";

export const resendClient = new Resend(ENV.RESEND_API_KEY);

// const getSenderEmail = () => {
//     const email = process.env.EMAIL_FROM;
//     // Resend does not allow sending from unverified domains like gmail.com.
//     // If EMAIL_FROM is missing or is a gmail address, we fallback to the Resend testing email.
//     if (!email || email.endsWith("@gmail.com")) {
//         return "onboarding@resend.dev";
//     }
//     return email;
// };

export const sender = {
    email: getSenderEmail(),
    name: ENV.EMAIL_FROM_NAME || "Chatify"
};