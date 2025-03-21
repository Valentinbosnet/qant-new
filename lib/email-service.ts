import nodemailer from "nodemailer"

interface EmailOptions {
  to: string
  subject: string
  html: string
}

// Create a transporter based on environment
const createTransporter = () => {
  // In development, use a test account
  if (process.env.NODE_ENV === "development" || !process.env.EMAIL_SERVER_HOST) {
    console.log("Using development email configuration")
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "ethereal.user@ethereal.email", // Replace with your Ethereal email
        pass: "ethereal_password", // Replace with your Ethereal password
      },
    })
  }

  // In production, use the configured email service
  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT || 587),
    secure: process.env.EMAIL_SERVER_SECURE === "true",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  })
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const transporter = createTransporter()

    // Log email details in development
    if (process.env.NODE_ENV === "development") {
      console.log("Email would be sent with the following details:")
      console.log(`To: ${to}`)
      console.log(`Subject: ${subject}`)
      console.log(`Content: ${html}`)

      // Return success in development without actually sending
      return { success: true, message: "Email sending simulated in development" }
    }

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"TradeAssist" <noreply@tradeassist.com>',
      to,
      subject,
      html,
    })

    console.log("Email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error }
  }
}

export function generateVerificationEmail(email: string, token: string) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"
  const verificationUrl = `${baseUrl}/verify-email?token=${token}`

  return {
    to: email,
    subject: "Vérifiez votre adresse email - TradeAssist",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Vérifiez votre adresse email</h2>
        <p>Bonjour,</p>
        <p>Merci de vous être inscrit à TradeAssist. Veuillez cliquer sur le lien ci-dessous pour vérifier votre adresse email :</p>
        <p style="margin: 20px 0;">
          <a href="${verificationUrl}" style="background-color: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Vérifier mon email
          </a>
        </p>
        <p>Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.</p>
        <p>Cordialement,<br>L'équipe TradeAssist</p>
      </div>
    `,
  }
}


export async function sendVerificationEmail(email: string, token: string) {
  const emailContent = generateVerificationEmail(email, token);
  return sendEmail(emailContent);
}

export async function sendWelcomeEmail(email: string, name: string) {
  return sendEmail({
    to: email,
    subject: "Bienvenue sur TradeAssist",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Bienvenue sur TradeAssist</h2>
        <p>Bonjour ${name},</p>
        <p>Nous sommes ravis de vous accueillir sur TradeAssist. Votre compte est maintenant vérifié et prêt à être utilisé.</p>
        <p>Cordialement,<br>L'équipe TradeAssist</p>
      </div>
    `,
  });
}


