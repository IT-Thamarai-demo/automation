# Daily Email Automation (Node.js)

This project sends a daily email at 6 PM IST using Node.js and Nodemailer. It is designed to be deployed as a Cron Job on Render.

## Features
- Written entirely in JavaScript (Node.js).
- Scheduled to run daily at 6 PM IST (12:30 PM UTC).
- Uses Gmail SMTP with App Passwords.

## Files
- `index.js`: The main automation script.
- `package.json`: Project dependencies and metadata.
- `render.yaml`: Configuration for Render Blueprint deployment.
- `.env.example`: Template for local environment variables.

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Run the script manually:
   ```bash
   node index.js
   ```

## Render Deployment
1. Push this repository to GitHub.
2. In Render, create a new **Blueprint** and connect your repository.
3. Render will automatically detect `render.yaml` and set up the Cron Job.
