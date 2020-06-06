var mongoose    = require('mongoose');
const Schema = mongoose.Schema;

var ticketSchema = mongoose.Schema({
    event_id:{
        type: Schema.Types.ObjectId, ref: 'Event' ,
        required:true
    },
    user_id:{
        type: Schema.Types.ObjectId, ref: 'User' ,
        required:true
    },
    event_name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default:new Date()
    },
    address: {
        type: String
    },
    ticket_price: {
        type: Number,
        required:true
    },
});

var Ticket = module.exports = mongoose.model('Ticket', ticketSchema);

// Pendiente export default mongoose.model('Store', storeSchema);
