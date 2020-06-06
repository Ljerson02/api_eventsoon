const express = require('express');
const router = express.Router();
const userController = require ("../controllers/usersController");
const validate = require ('./../services/validators/userValidator');

router.post('/register',validate.registerValidation(),validate.validate,userController.register);
router.post('/login',validate.loginValidation(),validate.validate,userController.login);
router.post('/checkuser',validate.email(),validate.validate,userController.validateEmail);


module.exports = router;
