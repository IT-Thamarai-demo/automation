# Daily Email Automation

A beginner-friendly Node.js project that sends a daily email at 6:00 PM using `node-cron`, `nodemailer`, and Gmail SMTP with an App Password.

## Features

- Sends an email every day at 6:00 PM.
- Uses a random message from `utils/message.js`.
- Optional random quote API support.
- Supports one or many receiver email addresses.
- Supports custom cron time and timezone.
- Uses environment variables for credentials.
- Includes success and failure logs.

## Project Structure

```text
daily-email-automation/
├── index.js
├── cron.js
├── mailer.js
├── config.js
├── utils/
│   └── message.js
├── package.json
├── .env.example
└── render.yaml
```

## Setup

### 1. Install Node.js

Install Node.js 18 or newer.

Check your version:

```bash
node -v
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your `.env` file

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Update `.env`:

```env
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-16-character-gmail-app-password
RECEIVER_EMAIL=receiver@example.com
CRON_SCHEDULE=0 18 * * *
TIMEZONE=Asia/Kolkata
USE_QUOTES_API=false
SEND_ON_STARTUP=false
```

Important: do not commit `.env`. It contains your Gmail App Password.

## Gmail App Password

Gmail SMTP does not work with your normal Gmail password. Use an App Password.

1. Open your Google Account.
2. Go to Security.
3. Enable 2-Step Verification if it is not already enabled.
4. Search for App passwords in your Google Account security settings.
5. Create an app password for Mail.
6. Copy the 16-character password.
7. Put it in `.env` as `EMAIL_PASS`.

If you shared an App Password publicly or in chat, delete it from Google Account settings and create a new one.

## Run the Project

Start the scheduler:

```bash
npm start
```

Send one email immediately for testing:

```bash
npm run send:now
```

You can also set this in `.env`:

```env
SEND_ON_STARTUP=true
```

Then `npm start` will send one email immediately and keep the daily scheduler running.

## Cron Timing

Default schedule:

```text
0 18 * * *
```

Meaning:

- `0` = minute 0
- `18` = hour 18, which is 6:00 PM
- `*` = every day of the month
- `*` = every month
- `*` = every day of the week

The timezone is controlled by:

```env
TIMEZONE=Asia/Kolkata
```

## Customize the Time

Change `CRON_SCHEDULE` in `.env`.

Examples:

```env
# Every day at 9:00 AM
CRON_SCHEDULE=0 9 * * *

# Every day at 6:30 PM
CRON_SCHEDULE=30 18 * * *

# Every Monday at 8:00 AM
CRON_SCHEDULE=0 8 * * 1
```

## Send to Multiple Emails

Use comma-separated email addresses:

```env
RECEIVER_EMAIL=person1@example.com,person2@example.com,person3@example.com
```

## Use Random Quotes from API

By default, the app uses local messages from `utils/message.js`.

To use random quotes from the Quotable API:

```env
USE_QUOTES_API=true
```

If the API fails, the app automatically falls back to a local message.

## Deployment

This app uses `node-cron`, so it must run as a long-running process. A background worker is better than a sleeping web service.

### Render

1. Push this project to GitHub.
2. Create a new Render Blueprint or Background Worker.
3. Use:
   - Build command: `npm install`
   - Start command: `npm start`
4. Add environment variables in Render:
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `RECEIVER_EMAIL`
   - `CRON_SCHEDULE`
   - `TIMEZONE`
   - `USE_QUOTES_API`
   - `SEND_ON_STARTUP`

The included `render.yaml` defines a worker and keeps secrets out of the file.

### Railway

1. Push this project to GitHub.
2. Create a new Railway project from the repository.
3. Add the same environment variables in Railway.
4. Set the start command to:

```bash
npm start
```

## Best Practices

- Keep `.env` private.
- Use a Gmail App Password, not your Gmail account password.
- Rotate the App Password if it was exposed.
- Test with `npm run send:now` before waiting for the cron job.
- Keep the deployment service running continuously when using `node-cron`.
