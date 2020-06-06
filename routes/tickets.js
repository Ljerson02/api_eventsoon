const express = require('express');
const router = express.Router();
const ticketController = require ("../controllers/ticketController");
const auth = require('./../services/auth/checkAuth');


router.post('/',auth.validateAuth,ticketController.create);
router.get('/',auth.validateAuth,ticketController.showAll);

module.exports = router;
