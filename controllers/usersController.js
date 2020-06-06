const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../configs/jwt-config')
const ensureAuthenticated = require('../modules/ensureAuthenticated')
const User = require('../models/User');
const TypedError = require('../modules/ErrorHandler')
var bcrypt = require('bcryptjs');

const register = async (req, res, next) => {

  const { fullname, email, password,nickname, verifyPassword } = req.body
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  var newUser = new User({
    fullname: fullname,
    password: hash,
    email: email,
    nickname: nickname
  });


  var user = await newUser.save();
  let token = jwt.sign(
          user.toJSON(),
          config.secret,
          { expiresIn: '7d' }
  );
  return res.json({
    user,
    token
  });
};

const login = async (req, res, next) => {

  const { email, password } = req.body

  var user = await User.findOne({email}).lean();

  if(!user){
    let err = new TypedError('login error', 404, 'not_found', { message: "Usuario no existe" })
    return next(err)
  }

  var check = await bcrypt.compare(password, user.password);
  if(!check){
    let err = new TypedError('login error', 404, 'not_valid', { message: "Clave incorrecta" })
    return next(err)
  }


  let token = jwt.sign(
          user,
          config.secret,
          { expiresIn: '7d' }
  );

  return res.json({
    user,
    token
  });
};

const validateEmail = async (req, res, next) => {

  const { email } = req.body

  var user = await User.findOne({email});

  if(user){
    let err = new TypedError('validation error', 404, 'user_exist', { message: "El usuario ya fue tomado" })
    return next(err)
  }

  return res.json({
    status:"ok"
  });
};

export default {
    register,
    login,
    validateEmail
}
