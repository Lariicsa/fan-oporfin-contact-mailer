const axios = require('axios')
const { config } = require('../../config');
const formData = require('form-data')
const RECAPTCHA_SERVER_KEY = config.verifyCaptchaOptions.secret
const URL_RECAPTCHA = config.verifyCaptchaOptions.url

const isHuman = async function (req, res, next) {
  try {
    if (typeof req.body.recaptchaToken === 'undefined') {
      res.json({
        error: true,
        message: 'require gToken',
        statusText: 401
      });
    } else {
      const recaptchaForm = new formData()
      recaptchaForm.append('secret', RECAPTCHA_SERVER_KEY)
      recaptchaForm.append('response', req.body.recaptchaToken)
      let response = await axios.create({
        headers: recaptchaForm.getHeaders()
      }).post(URL_RECAPTCHA, recaptchaForm)
      try {
        console.log('google responded with: ', response.data)
        if (response.data.success) {
          delete req.body.recaptchaToken
          return next()
        }
      } catch (err) {
        console.log(err)
        res.json({
          error: 'require gToken'
        });
        return next()
      }
    }
  } catch (error) {
    console.log(error)
    return next()
  }
}

module.exports = isHuman