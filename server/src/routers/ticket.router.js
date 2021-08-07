const express = require('express');
const router = express.Router();
const controller = require('../controllers/ticket.controller')
const upload=require('../services/upload-service')


router.post('/add/ticket', upload.single('ticketImage'), controller.addTicket);
router.get('/tickes',controller.getAllTickets);
router.get('/ticket/:id',controller.getTicket);
router.put('/reply',controller.addReply);
router.get('/closeticket/:id',controller.closeTicket);




module.exports = router

