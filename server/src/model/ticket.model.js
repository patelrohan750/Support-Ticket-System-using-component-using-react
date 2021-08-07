const mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    },
     ticketImage: {
        type: String,
        required: false
    },
    status:{
        type:Boolean,
        required:false,
        default:true
    },
    replys:[{
        text:String,
    }],
},{
    timestamps:true
})

const Ticket = new mongoose.model('ticket', TicketSchema);
module.exports = Ticket