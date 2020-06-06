import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes";
import TypedError from "./modules/ErrorHandler";
require('dotenv').config();

mongoose.connect(
  process.env.MONGO_CONECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },function(error){
  if(error) throw error
    console.log(`connect mongodb success`);
});

var app = express()
app.use(cors())


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

//set static dir
app.use(express.static(path.join(__dirname, 'public')));

//routers
app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new TypedError('page not found', 404, 'page_not_found', { message: "La pagina solicitada no existe" })
    return next(err)
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500).json(err);
});

app.listen(3010, () => {
  console.log(`server started on Port: 3010}`);
});

module.exports = app;
