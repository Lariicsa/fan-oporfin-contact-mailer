require('dotenv').config()
const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: 8080,
  dockerPort: 8080,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASS,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_BCC: process.env.SMTP_BCC,
  SMTP_PAZZ: process.env.SMTP_PAZZ,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_FAN_USER: process.env.SMTP_FAN_USER,
  SMTP_FAN_PAZZ: process.env.SMTP_FAN_PAZZ,
  SMTP_FAN_PORT: process.env.SMTP_FAN_PORT,
  SMTP_FAN_SECURE: process.env.SMTP_FAN_SECURE,
  SMTP_FAN_IGNORE_TLS: process.env.SMTP_FAN_IGNORE_TLS,
  SMTP_FAN_HOST: 'smtp.sendgrid.net',
  verifyCaptchaOptions: {
    url: 'https://www.google.com/recaptcha/api/siteverify',
    secret: '6LfvpuIZAAAAAIQs3c8abuoiwAdAOdDT3tmZNDr7'
  },
}

module.exports = { config };

