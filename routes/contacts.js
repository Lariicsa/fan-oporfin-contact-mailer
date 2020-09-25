const express = require('express');
const ContactsService = require('../services/contacts');
const {
  createContactSchema
} = require('../utils/schemas/contact')

const transport = require("../config/sendMail");

const validationHandler = require('../utils/middlewares/validationHandler')

function contactsApi(app) {
  const router = express.Router();
  app.use('/api/contacts', router);

  const contactsService = new ContactsService();

  router.get('/', async function (req, res, next) {
    const { tags } = req.query;

    try {
      const contacts = await contactsService.getContacts({ tags });

      res.status(200).json({
        data: contacts,
        message: 'Contacts Listed'
      });
    } catch (err) {
      next(err);
    }
  });


  router.post('/', validationHandler(createContactSchema), async function (req, res, next) {
    const { body: contact } = req;
    try {
      const createdContact = await contactsService.createContact({ contact });
      console.log('contact', contact);

      await transport.sendMail({
        from: `Contacto OPORFIN <contacto@oportunidadesfinancieras.com.mx>`,
        to: process.env.SMTP_EMAIL,
        subject: "OPORFIN | Mensaje desde Landingpage",
        html: `<h1>${contact.subject}</h1>
            <p>Nombre: ${contact.contactname}</p>
            <p>e-Mail: ${contact.email} </p>
            <p>Mensaje: ${contact.message}</p>
            <p>teléfono: ${contact.phone}</p>
          `,
      });

      res.status(201).json({
        data: createdContact,
        message: 'Contact info Sent'
      });
    } catch (err) {
      console.log('que error', err);
      res.json({
        error: err
      });
      next(err);
    }
  });

}

module.exports = contactsApi;