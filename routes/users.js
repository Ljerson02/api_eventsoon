const express = require('express');
const router = express.Router();
import userController from "../controllers/usersController";
import validate from "@validators/userValidator.js";


router.post('/register',validate.registerValidation(),validate.validate,userController.register);
router.post('/login',validate.loginValidation(),validate.validate,userController.login);
router.post('/checkuser',validate.email(),validate.validate,userController.validateEmail);


export default router;
