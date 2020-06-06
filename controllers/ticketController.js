import TicketSchema from "@models/Ticket";
import EventSchema from "@models/Event";
import TypedError from "../modules/ErrorHandler";
import jwt from 'jsonwebtoken';

const config = require('../configs/jwt-config')

const show = async (req, res, next) => {
    try {
      var event = await TicketSchema.findById(req.params.id);
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
        var token = req.headers.authorization.replace('JWT ', '');
        var decodedAuth = jwt.verify(token, config.secret);
        
        var allEvents = await TicketSchema.find({"user_id": decodedAuth._id});
        if(!allEvents){
            let err = new TypedError('login error', 404, 'not_found', { message: "No tienes ningun boleto" })
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
      var decodedAuth = jwt.verify(token, config.secret);
      
      console.log("Buscar por ", req.body.event_id);
      var findEvent = await EventSchema.findById(req.body.event_id);
      if(!findEvent){
            let err = new TypedError('Ticket error', 404, 'not_found', { message: "El evento ya no esta disponible" })
            return next(err)
        }
    
      var newTicket = new TicketSchema({
        event_id: req.body.event_id,
        user_id:decodedAuth._id,
        event_name: findEvent.name,
        date: findEvent.date,
        address: findEvent.address,
        ticket_price: findEvent.ticket_price,
      });

      var ticket = await newTicket.save();

      return res.json({status:"isOk",ticket});
    } catch (e) {
        let err = new TypedError('create error', 500, 'error', { message: e });
        return next(err);
    }
};

export default {
    show,
    showAll,
    create
}
