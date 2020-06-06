const express = require('express');
const router = express.Router();
const eventController = require ("../controllers/eventController");
const validate = require ("./../services/validators/eventValidator.js");
const auth = require ('./../services/auth/checkAuth');


router.post('/',auth.validateAuth,validate.eventDataValidation(),validate.validate,eventController.create);
router.get('/',auth.validateAuth,eventController.show);
router.get('/showAll', auth.validateAuth, eventController.showAll);
router.put('/',auth.validateAuth,validate.eventDataValidation(),validate.validate,eventController.update);

module.exports = router;
