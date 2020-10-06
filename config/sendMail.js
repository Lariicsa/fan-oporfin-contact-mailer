const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  port: process.env.SMTP_FAN_PORT,
  host: process.env.SMTP_FAN_HOST,
  secure: process.env.SMTP_FAN_SECURE,
  ignoreTLS: process.env.SMTP_FAN_IGNORE_TLS,
  debug: true,
  auth: {
    user: process.env.SMTP_FAN_USER,
    pass: process.env.SMTP_FAN_PAZZ
  },
});

module.exports = transport;
