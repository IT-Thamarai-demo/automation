require('dotenv').config();
const nodemailer = require('nodemailer');

// ─── Config ───────────────────────────────────────────────────────────────────
const EMAIL_USER     = process.env.EMAIL_USER     || 'onlinepannipuri@gmail.com';
const EMAIL_PASS     = process.env.EMAIL_PASS     || 'vrkj brvl dica ghfg';
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL || 'thamarair65@gmail.com';

// ─── Main ─────────────────────────────────────────────────────────────────────
async function sendDailyEmail() {
  console.log(`[${new Date().toISOString()}] Starting daily email automation...`);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  // Verify SMTP connection before sending
  await transporter.verify();
  console.log('✅ SMTP connection verified successfully.');

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
      <div style="font-family:Arial,sans-serif;max-width:500px;margin:auto;border:1px solid #eee;border-radius:8px;overflow:hidden;">
        <div style="background:#4f46e5;padding:24px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:22px;">📬 Daily Email Notification</h1>
        </div>
        <div style="padding:24px;background:#f9f9f9;">
          <p style="font-size:16px;color:#333;">Hello,</p>
          <p style="font-size:15px;color:#555;">
            This is your scheduled daily notification for <strong>${dateStr}</strong> at <strong>${timeStr} IST</strong>.
          </p>
          <p style="font-size:15px;color:#555;">
            This email was sent automatically by your Render cron job.
          </p>
          <hr style="border:none;border-top:1px solid #ddd;margin:20px 0;"/>
          <p style="font-size:12px;color:#999;text-align:center;">
            Sent from: ${EMAIL_USER} &nbsp;|&nbsp; Automation running on Render
          </p>
        </div>
      </div>
    `
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`✅ Email sent successfully! Message ID: ${info.messageId}`);
  console.log(`   From: ${EMAIL_USER}`);
  console.log(`   To:   ${RECEIVER_EMAIL}`);
}

// ─── Run ──────────────────────────────────────────────────────────────────────
sendDailyEmail().catch((err) => {
  console.error('❌ Failed to send email:', err.message);
  process.exit(1);
});
