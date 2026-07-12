// back-end/server.js - WolfPort Backend Server
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import chatRouter from './routes/chat.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Import routes
app.use('/api', chatRouter);

// ==================== CONTACT FORM ENDPOINT ====================

app.post('/api/contact', async (req, res) => {
  console.log('📧 Contact endpoint called');
  
  try {
    const { name, message, email } = req.body;
    
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Missing email credentials');
      return res.status(500).json({ error: 'Email not configured' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.verify();
    console.log('✅ Email transporter verified');

    const mailOptions = {
      from: `"WolfPort" <${process.env.EMAIL_USER}>`,
      to: 'wolfras87@gmail.com',
      subject: `🐺 New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email || 'Not provided'}\n\nMessage:\n${message}`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', result.messageId);

    res.json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD)
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'WolfPort Backend Server',
    endpoints: ['/api/chat', '/api/contact', '/api/health']
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}\n`);
});