require('dotenv').config();

const { startEmailCron } = require('./cron');
const { sendDailyEmail } = require('./mailer');
const { getConfig } = require('./config');

const config = getConfig();

console.log('Daily email automation started.');
console.log(`Schedule: ${config.cronSchedule}`);
console.log(`Timezone: ${config.timezone}`);
console.log(`Recipients: ${config.receiverEmails.join(', ')}`);

startEmailCron();

// Optional: send one email immediately after starting the app.
// Useful for checking credentials before waiting for the scheduled time.
if (config.sendOnStartup) {
  sendDailyEmail()
    .then((info) => {
      console.log(`Startup email sent successfully. Message ID: ${info.messageId}`);
    })
    .catch((error) => {
      console.error(`Startup email failed: ${error.message}`);
    });
}
