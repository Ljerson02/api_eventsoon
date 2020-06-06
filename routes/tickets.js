const express = require('express');
const router = express.Router();
import ticketController from "../controllers/ticketController";
import auth from "@auth/checkAuth";


router.post('/',auth.validateAuth,ticketController.create);
router.get('/',auth.validateAuth,ticketController.showAll);

export default router;
