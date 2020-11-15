const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 2525,
  debug: true,
  logger: true,
  auth: {
    user: process.env.SMTP_UZER,
    pass: process.env.SMTP_PAZZ
  },
});

module.exports = transport;
