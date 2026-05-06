const DEFAULT_CRON_SCHEDULE = '0 18 * * *';
const DEFAULT_TIMEZONE = 'Asia/Kolkata';

function getRequiredEnv(name) {
  const value = process.env[name];

  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value.trim();
}

function parseEmailList(value) {
  return value
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);
}

function getConfig() {
  const receiverEmails = parseEmailList(getRequiredEnv('RECEIVER_EMAIL'));

  if (receiverEmails.length === 0) {
    throw new Error('RECEIVER_EMAIL must contain at least one email address.');
  }

  return {
    emailUser: getRequiredEnv('EMAIL_USER'),
    emailPass: getRequiredEnv('EMAIL_PASS'),
    receiverEmails,
    cronSchedule: process.env.CRON_SCHEDULE || DEFAULT_CRON_SCHEDULE,
    timezone: process.env.TIMEZONE || DEFAULT_TIMEZONE,
    useQuotesApi: process.env.USE_QUOTES_API === 'true',
    sendOnStartup: process.env.SEND_ON_STARTUP === 'true',
  };
}

module.exports = {
  getConfig,
};
