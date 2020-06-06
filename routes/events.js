const express = require('express');
const router = express.Router();
import eventController from "../controllers/eventController";
import validate from "@validators/eventValidator.js";
import auth from "@auth/checkAuth";


router.post('/',auth.validateAuth,validate.eventDataValidation(),validate.validate,eventController.create);
router.get('/',auth.validateAuth,eventController.show);
router.get('/showAll', auth.validateAuth, eventController.showAll);
router.put('/',auth.validateAuth,validate.eventDataValidation(),validate.validate,eventController.update);

export default router;
