const nodemailer = require('nodemailer');
const { getConfig } = require('./config');
const { getDailyMessage } = require('./utils/message');

function createTransporter(config) {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  });
}

async function sendDailyEmail() {
  const config = getConfig();
  const transporter = createTransporter(config);
  const message = await getDailyMessage(config.useQuotesApi);

  const mailOptions = {
    from: `"Daily Message" <${config.emailUser}>`,
    to: config.receiverEmails,
    subject: 'Daily Message',
    text: message,
    html: `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
  };

  try {
    await transporter.verify();
    const info = await transporter.sendMail(mailOptions);

    console.log(`Email sent successfully. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Email sending failed: ${error.message}`);
    throw error;
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = {
  sendDailyEmail,
};
