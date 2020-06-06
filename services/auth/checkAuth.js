import jwt from 'jsonwebtoken';
import config from "@config/jwt-config"
const validateAuth = (req, res, next) => {

    var token = req.headers.authorization;
    if(!token){
      return res.status(401).json({
        error: "no-auth",
      })
    }
    console.log(token);
    var token = token.replace('JWT ', '');
    var decodedAuth = jwt.verify(token, config.secret);
    if(decodedAuth)
        return next()
    else{
        return res.status(401).json({
          error: "no-auth",
        })
    }

}

export default {
    validateAuth
}
