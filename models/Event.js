var mongoose    = require('mongoose');
const Schema = mongoose.Schema;

var eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
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
    restrictions:{
        type : Array , "default" : []
    },
    created_at: {
        type: Date,
        required: true,
        default:new Date()
    },
    owner_id:{
        type: Schema.Types.ObjectId, ref: 'User' ,
        required:true
    },
    ticket_price: {
        type: Number,
        required:true
    },
    tickets_available: {
        type: Number
    }
});

var Event = module.exports = mongoose.model('Event', eventSchema);

// Pendiente export default mongoose.model('Store', storeSchema);
