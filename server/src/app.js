const express=require('express')
const app=express();
const port=8000;
require('./db/conn')
const TicketRouter=require('./routers/ticket.router')


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'))

app.use(TicketRouter)



app.listen(port,()=>{
    console.log(`server runing at  http://localhost:${port}`);
})