require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Config ───────────────────────────────────────────────────────────────────
const EMAIL_USER     = process.env.EMAIL_USER     || 'onlinepannipuri@gmail.com';
const EMAIL_PASS     = process.env.EMAIL_PASS     || 'vrkj brvl dica ghfg';
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL || 'thamarair65@gmail.com';

// ─── Email Function ───────────────────────────────────────────────────────────
async function sendDailyEmail() {
  console.log(`[${new Date().toISOString()}] Starting email process...`);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  await transporter.verify();
  console.log('✅ SMTP verified.');

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    timeZone: 'Asia/Kolkata'
  });
  const timeStr = now.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata'
  });

  const mailOptions = {
    from: `"Daily Automation" <${EMAIL_USER}>`,
    to: RECEIVER_EMAIL,
    subject: `📬 Daily Notification — ${dateStr}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:500px;margin:auto;border:1px solid #eee;border-radius:8px;padding:20px;background:#f9f9f9;">
        <h2 style="color:#4f46e5;">📬 Daily Email Notification</h2>
        <p>Hello, this is your scheduled notification for <b>${dateStr}</b> at <b>${timeStr} IST</b>.</p>
        <p>Status: Automation Triggered Successfully ✅</p>
      </div>
    `
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// 1. Health check / Homepage
app.get('/', (req, res) => {
  res.send('✅ Automation Server is Running. Use /trigger to send email.');
});

// 2. Trigger endpoint (Link this to cron-job.org or UptimeRobot)
app.get('/trigger', async (req, res) => {
  try {
    const info = await sendDailyEmail();
    console.log(`✅ Email sent: ${info.messageId}`);
    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error('❌ Failed:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
