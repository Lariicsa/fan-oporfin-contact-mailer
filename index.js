const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');
const contactsApi = require('./routes/contacts.js');

const { logErrors, errorHandler, wrapErrors } = require('./utils/middlewares/errorHandlers.js')
const notFoundHandler = require('./utils/middlewares/notFoundHandler.js')

// body parser
app.use(express.json());

//moviesApi(app);
contactsApi(app);

//catch 404 err
app.use(notFoundHandler)

//Errors handlers --siempre al final de la ruta
app.use(logErrors);
app.use(wrapErrors)
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
