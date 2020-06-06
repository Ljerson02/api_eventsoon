const TypedError = require('../../modules/ErrorHandler');
const { check, validationResult } = require('express-validator');
const User = require('./../../models/User');

const registerValidation = (req, res, next) => {
  console.log({req});
  return [
    check('fullname', 'Nombre es requerido').not().isEmpty(),
    check('email', 'Email es requerido').not().isEmpty(),
    check('nickname', 'Nickname es requerido').not().isEmpty(),
    check('password', 'Contraseña es requerida').not().isEmpty(),
    check('email', 'Email ha sido tomado por otro usuario')
    .not().isEmpty().
    custom( (value) => {
      var query = User.findOne({ email: value})
      return query.exec().then(user => {
        if(user){
          return Promise.reject('Email ha sido tomado por otro usuario');
        }
      });
    }
    ),
    check('passwordConfirmation', 'Debes validar la confirmación de la contraseña')
    .not().isEmpty()
    .custom((value, { req }) => value === req.body.password)
  ]
}

const loginValidation = (req, res, next) => {
  return [
    check('email', 'Email es requerido').not().isEmpty(),
    check('password', 'Contraseña es requerida').not().isEmpty()
  ]
}

const email = (req, res, next) => {
  return [
    check('email', 'Email es requerido').not().isEmpty()
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}


module.exports = {
    registerValidation,
    loginValidation,
    validate,
    email
}
