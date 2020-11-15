const express = require('express');
const ContactsService = require('../services/contacts');
const {
  createContactSchema
} = require('../utils/schemas/contact')
const transport = require("../utils/sendMail");
const { config } = require('../config.js');
const isHuman = require('../utils/middlewares/isHuman')
const validationHandler = require('../utils/middlewares/validationHandler')

function contactsApi(app) {
  const router = express.Router();
  app.use('/', router);
  const contactsService = new ContactsService();
  router.get('/', async function (req, res, next) {
    try {
      res.status(200)
      res.send('<h2>OPORFIN API IS RUNNING</h2>')
    } catch (err) {
      res.json({
        error: err
      });
      res.send('<h2>Something is Bad, check console</h2>')
      next(err);
    }
  });

  router.get('/api/contacts', async function (req, res, next) {
    const { tags } = req.query;
    try {
      const contacts = await contactsService.getContacts({ tags });
      res.status(200).json({
        data: contacts,
        message: 'Contacts Listed'
      });

    } catch (err) {
      res.json({
        error: err
      });
      next(err);
    }
  });


  router.post('/api/contacts', validationHandler(createContactSchema), isHuman, async function (req, res, next) {
    const { body: contact } = req
    try {
      const createdContact = await contactsService.createContact({ contact });
      await transport.sendMail({
        from: `Contacto de cliente <contacto@oportunidadesfinancieras.com.mx>`,
        to: config.SMTP_EMAIL,
        bcc: config.SMTP_BCC,
        subject: "OPORFIN | Mensaje desde Landingpage",
        html: `<div style="background-color: #f8f8fb; border: 1px solid #e7e7f2; padding: 20px; border-radius: 6px">
        <h1>${contact.contactname}</h1>
            <p style="font-size: 16px">Asunto: <strong>${contact.subject}</strong></p>
            <p style="font-size: 16px">e-Mail: <strong>${contact.email}</strong> </p>
            <p style="font-size: 16px">Teléfono: <strong>${contact.phone}</strong></p>
            <p style="font-size: 16px"><strong>Mensaje:</strong></p>
            <p style="background-color: #ffffff; padding: 6px; font-size: 16px">${contact.message}</p>
        </div>
          `,
      });
      res.status(201).json({
        data: contact,
        message: 'Contact info Sent',
        error: false
      });
    } catch (err) {
      console.log('showed error', err);
      res.status(401).json({
        data: err,
        message: 'Not created',
        error: true
      });
      next(err);
    }
  });

}

module.exports = contactsApi;