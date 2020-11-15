const nodemailer = require("nodemailer");
const { config } = require('../config');

const transport = nodemailer.createTransport({
  port: config.SMTP_FAN_PORT,
  host: config.SMTP_FAN_HOST,
  secure: config.SMTP_FAN_SECURE,
  ignoreTLS: false,
  debug: true,
  auth: {
    user: config.SMTP_FAN_USER,
    pass: config.SMTP_FAN_PAZZ
  },
});

module.exports = transport;
