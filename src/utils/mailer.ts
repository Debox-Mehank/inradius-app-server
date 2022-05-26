import nodemailer, { SendMailOptions } from "nodemailer"
import { signJwt } from "./jwt"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
})

export const sendUserVerificationEmail = async ({ email, name, userId }: { email: string, name: string, userId: string }) => {
    const appUrl = process.env.APP_URL!
    // const uniqueId = nanoid() + userId

    const token = signJwt({ email: email, id: userId }, { expiresIn: "15m" })

    const verificationLink = `${appUrl}/email-verification?userId=${userId}&token=${token}`

    const mailOptions: SendMailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify Your Email!",
        html: `<p style="white-space: pre-line;">Hi ${name}, \n\nWe are excited to have you get started with InRadius for your job / talent search. First, you need to verify that this is your email address by clicking the link below.</p><p>This link will <b>expire in 15 minutes.</b></p><a href='${verificationLink}' target='_blank'>Click Here</a>`
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log("Mail sending error: " + error)
    }

}