const TypedError = require('../../modules/ErrorHandler');
const { check, body,validationResult,checkIf } = require('express-validator');


const eventDataValidation = (req, res, next) => {
  return [
    check('name', 'Nombre de evento es requerido').not().isEmpty(),
    check('name', 'Nombre no puede contener más de 30 caracteres').not().isEmpty().isLength({ min: 1, max:30 }),
    check('description', 'La descripción es requerida').not().isEmpty(),
    check('description', 'La descripción no puede contener más de 140 caracteres').not().isEmpty().isLength({ min: 1, max:140 }),
    check('address', 'La direccion del es requerida').not().isEmpty(),
    check('ticket_price', 'El precio de la boleta no puede estar vacio y debe ser numerico').not().isEmpty().isNumeric(),
    check('tickets_available', 'El numero de boletas no puede estar vacio y debe ser numerico').not().isEmpty().isNumeric()
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
    eventDataValidation,
    validate
}
