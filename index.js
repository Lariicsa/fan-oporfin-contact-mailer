const express = require('express');
const app = express();
const { config } = require('./config/index');
const contactsApi = require('./routes/contacts.js');
const { logErrors, errorHandler, wrapErrors } = require('./utils/middlewares/errorHandlers.js')
const notFoundHandler = require('./utils/middlewares/notFoundHandler.js')

// body parser
app.use(express.json());

contactsApi(app);

//middleware for CORS
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "https://oporfin-mailer.herokuapp.com/api")
	res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT")
	next()
})

//catch 404 err
app.use(notFoundHandler)

//Errors handlers --siempre al final de la ruta
app.use(logErrors);
app.use(wrapErrors)
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
