const EventSchema = require ("./../models/Event");
const TypedError = require ("../modules/ErrorHandler");
const jwt = require ('jsonwebtoken');

const show = async (req, res, next) => {
    try {
      var event = await EventSchema.findById(req.query.id);
      if(!event){
          let err = new TypedError('login error', 404, 'not_found', { message: "El evento no existe" })
          return next(err)
      }

      return res.json({status:"isOk",event});

    } catch (e) {
        let err = new TypedError('page error', 500, 'internat_server_error', { message: "Hubo un problema",err:e });
        return next(err);
    }
};

const showAll = async (req, res, next) => {
    try {
      var allEvents = await EventSchema.find({});
      if(!allEvents){
          let err = new TypedError('login error', 404, 'not_found', { message: "Hubo un problema al traer los eventos" })
          return next(err)
      }

      return res.json({status:"isOk",allEvents});

    } catch (e) {
        let err = new TypedError('page error', 500, 'internat_server_error', { message: "Hubo un problema",err:e });
        return next(err);
    }
};

const create = async (req, res, next) => {
    try {
      var token = req.headers.authorization.replace('JWT ', '');
      var decodedAuth = jwt.verify(token, process.env.JWT_SECRET);

      var newEvent = new EventSchema({
        name:req.body.name,
        description:req.body.description,
        date: req.body.date,
        address: req.body.address,
        restrictions: req.body.restrictions,
        owner_id:decodedAuth._id,
        ticket_price:req.body.ticket_price,
        tickets_available:req.body.tickets_available
      });
      
      var event = await newEvent.save();

      return res.json({status:"isOk",event});
    } catch (e) {
        let err = new TypedError('create error', 500, 'error', { message: e });
        return next(err);
    }
};

const update = async (req, res, next) => {
    try {
      var event = await EventSchema.findById(req.query.id);

      if(!event){
          let err = new TypedError('login error', 404, 'not_found', { message: "El evento no existe" })
          return next(err)
      }


      event.name = req.body.name;
      event.description=req.body.description;
      event.date= req.body.date;
      event.address= req.body.address;
      event.restrictions= req.body.restrictions;
      event.ticket_price= req.body.ticket_price;
      event.tickets_available= req.body.tickets_available;
      
      await event.save();

      return res.json({status:"isOk",event});

    } catch (e) {
        let err = new TypedError('page error', 500, 'internat_server_error', { message: "Hubo un problema",err:e })
        return next(err)
    }
};


module.exports = {
    show,
    showAll,
    create,
    update
}
