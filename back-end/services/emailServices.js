// backend/services/emailService.js
import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,     // your Gmail address
      pass: process.env.EMAIL_APP_PASSWORD, // Gmail App Password
    },
  });
};

// Send email to you (wolfras)
export const sendContactEmail = async (name, message, userEmail = null) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"WolfPort Contact" <${process.env.EMAIL_USER}>`,
      to: 'wolfras87@gmail.com',
      subject: `🐺 New message from ${name} on WolfPort`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #1a1a1a; color: #ffffff; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #000000; border: 1px solid #ff7e00; border-radius: 12px; padding: 20px;">
            <div style="text-align: center; border-bottom: 1px solid #ff7e00; padding-bottom: 15px; margin-bottom: 20px;">
              <h2 style="color: #ff7e00;">🐺 New Message from WolfPort</h2>
            </div>
            
            <div>
              <p><strong style="color: #ffcc00;">From:</strong> ${name}</p>
              ${userEmail ? `<p><strong style="color: #ffcc00;">Email:</strong> ${userEmail}</p>` : ''}
              <p><strong style="color: #ffcc00;">Sent:</strong> ${new Date().toLocaleString()}</p>
              
              <div style="background: #1a1a1a; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong style="color: #ffcc00;">Message:</strong></p>
                <p style="line-height: 1.6;">${message}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        New message from ${name} on WolfPort
        Sent: ${new Date().toLocaleString()}
        
        Message:
        ${message}
        
        ---
        Sent from WolfPort portfolio
        https://wolfport.vercel.app
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Email error:', error);
    return { success: false, error: error.message };
  }
};

// Send auto-reply to visitor (optional)
export const sendAutoReply = async (toEmail, name) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Mugisha Isihaqa" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
          <h2 style="color: #ff7e00;">Thank you, ${name}! 🙏</h2>
          <p>I've received your message and will get back to you as soon as possible.</p>
          <p>In the meantime, feel free to check out my projects on <a href="https://github.com/wolfras" style="color: #ff7e00;">GitHub</a>.</p>
          <br>
          <p>Best regards,</p>
          <p><strong style="color: #ff7e00;">Mugisha Isihaqa (wolfras)</strong></p>
          <p><a href="https://wolfport.vercel.app" style="color: #ff7e00;">wolfport.vercel.app</a></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Auto-reply sent to:', toEmail);
    return { success: true };
  } catch (error) {
    console.error('❌ Auto-reply error:', error);
    return { success: false };
  }
};