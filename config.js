const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: 3000,
  dockerPort: 8080,
  dbUser: 'oporfin_admin',
  dbPassword: 'DlOWUHZQRp1fF19q',
  dbHost: 'cluster0.pcwtw.mongodb.net',
  dbName: 'mail_contacts',
  SMTP_EMAIL: 'ppadilla@oportunidadesfinancieras.com.mx',
  SMTP_BCC: 'larissa@fantasticocomic.com',
  SMTP_PAZZ: '394fa02c628c38',
  SMTP_FAN_USER: 'Suscripciones',
  SMTP_FAN_PAZZ: 'AZRfkXX4yXhs',
  SMTP_FAN_PORT: 465,
  SMTP_FAN_SECURE: true,
  SMTP_FAN_IGNORE_TLS: true,
  SMTP_FAN_HOST: 'smtp.sendgrid.net'
}

module.exports = { config };