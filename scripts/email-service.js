import nodemailer from "nodemailer"

// Email service for sending notifications
class EmailService {
  constructor() {
    // Configure your email provider (Gmail, SendGrid, etc.)
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  async sendPropertyInquiry(propertyData, inquiryData) {
    try {
      const { title, contact: propertyContact } = propertyData
      const { name, email, phone, message } = inquiryData

      // Email to property owner
      const ownerEmailOptions = {
        from: process.env.FROM_EMAIL || "noreply@focusproperty.com",
        to: propertyContact,
        subject: `New Inquiry for ${title}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Property Inquiry</h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Property: ${title}</h3>
              <p><strong>Inquirer:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
              <p><strong>Message:</strong></p>
              <p style="background: white; padding: 15px; border-radius: 4px;">${message}</p>
            </div>
            <p style="color: #64748b; font-size: 14px;">
              This inquiry was sent through Focus Property website.
            </p>
          </div>
        `,
      }

      // Confirmation email to inquirer
      const inquirerEmailOptions = {
        from: process.env.FROM_EMAIL || "noreply@focusproperty.com",
        to: email,
        subject: `Thank you for your inquiry about ${title}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Thank You for Your Inquiry</h2>
            <p>Dear ${name},</p>
            <p>Thank you for your interest in <strong>${title}</strong>.</p>
            <p>We have received your inquiry and will get back to you within 24 hours.</p>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Your Message:</h3>
              <p style="background: white; padding: 15px; border-radius: 4px;">${message}</p>
            </div>
            <p>Best regards,<br>Focus Property Team</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
            <p style="color: #64748b; font-size: 14px;">
              Focus Property - Your trusted real estate partner in Bangkok
            </p>
          </div>
        `,
      }

      // Send both emails
      await Promise.all([this.transporter.sendMail(ownerEmailOptions), this.transporter.sendMail(inquirerEmailOptions)])

      console.log("✅ Property inquiry emails sent successfully")
      return { success: true }
    } catch (error) {
      console.error("❌ Error sending property inquiry emails:", error)
      return { success: false, error: error.message }
    }
  }

  async sendContactForm(contactData) {
    try {
      const { name, email, phone, subject, message } = contactData

      const emailOptions = {
        from: process.env.FROM_EMAIL || "noreply@focusproperty.com",
        to: process.env.CONTACT_EMAIL || "contact@focusproperty.com",
        subject: `Contact Form: ${subject || "General Inquiry"}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Contact Form Submission</h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
              <p><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
              <p><strong>Message:</strong></p>
              <p style="background: white; padding: 15px; border-radius: 4px;">${message}</p>
            </div>
            <p style="color: #64748b; font-size: 14px;">
              Submitted at: ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      }

      await this.transporter.sendMail(emailOptions)
      console.log("✅ Contact form email sent successfully")
      return { success: true }
    } catch (error) {
      console.error("❌ Error sending contact form email:", error)
      return { success: false, error: error.message }
    }
  }

  async sendWelcomeEmail(userData) {
    try {
      const { name, email } = userData

      const emailOptions = {
        from: process.env.FROM_EMAIL || "noreply@focusproperty.com",
        to: email,
        subject: "Welcome to Focus Property!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Welcome to Focus Property!</h2>
            <p>Dear ${name},</p>
            <p>Welcome to Focus Property, Bangkok's premier real estate platform!</p>
            <p>You can now:</p>
            <ul>
              <li>Browse thousands of properties</li>
              <li>Save your favorite listings</li>
              <li>Get instant notifications for new properties</li>
              <li>Contact agents directly</li>
              <li>List your own properties</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://focusproperty.com/dashboard" 
                 style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Go to Dashboard
              </a>
            </div>
            <p>If you have any questions, feel free to contact our support team.</p>
            <p>Best regards,<br>Focus Property Team</p>
          </div>
        `,
      }

      await this.transporter.sendMail(emailOptions)
      console.log("✅ Welcome email sent successfully")
      return { success: true }
    } catch (error) {
      console.error("❌ Error sending welcome email:", error)
      return { success: false, error: error.message }
    }
  }
}

// Usage example
const emailService = new EmailService()

// Test the email service
async function testEmailService() {
  console.log("🧪 Testing email service...")

  // Test contact form email
  const contactResult = await emailService.sendContactForm({
    name: "John Doe",
    email: "john@example.com",
    phone: "+66 81 234 5678",
    subject: "Test Contact Form",
    message: "This is a test message from the contact form.",
  })

  console.log("Contact form test result:", contactResult)

  // Test property inquiry email
  const inquiryResult = await emailService.sendPropertyInquiry(
    {
      title: "Luxury 2BR Condo at Noble Ploenchit",
      contact: "agent@focusproperty.com",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+66 82 345 6789",
      message: "I am interested in viewing this property. When would be a good time?",
    },
  )

  console.log("Property inquiry test result:", inquiryResult)
}

// Uncomment to test
// testEmailService();

export default EmailService
