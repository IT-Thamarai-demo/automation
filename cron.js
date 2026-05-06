const cron = require('node-cron');
const { getConfig } = require('./config');
const { sendDailyEmail } = require('./mailer');

function startEmailCron() {
  const config = getConfig();

  if (!cron.validate(config.cronSchedule)) {
    throw new Error(`Invalid CRON_SCHEDULE value: ${config.cronSchedule}`);
  }

  cron.schedule(
    config.cronSchedule,
    async () => {
      console.log(`[${new Date().toISOString()}] Running scheduled email job.`);

      try {
        await sendDailyEmail();
      } catch (error) {
        console.error(`Scheduled email job failed: ${error.message}`);
      }
    },
    {
      timezone: config.timezone,
    }
  );

  console.log('Email cron job registered.');
}

module.exports = {
  startEmailCron,
};
