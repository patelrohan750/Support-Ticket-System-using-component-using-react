const Ticket=require('../model/ticket.model');



module.exports.addTicket=(req,res)=>{
    const {name,message}=req.body;
    console.log(message)
    console.log(req.body)
    // console.log(req.file.path)

    new Ticket({
        name,message,ticketImage:req.file.path
    }).save().then((result)=>{
        res.json({data:result})
    }).catch((err)=>{
        if (err) {
            if (err.name == 'ValidationError') {
                for (field in err.errors) {
                    console.log(err.errors[field].message); 
                   return  res.json({error:err.errors[field].message})
                }
            }
        }
    })
    

}

module.exports.getAllTickets=(req,res)=>{
    Ticket.find().then((results)=>{
        res.json({data:results})
    }).catch((e)=>{
        return res.status(404).json({message:"some error are occured"})
    })
}

module.exports.getTicket=(req,res)=>{
    Ticket.findById(req.params.id).then((result)=>{
        if(!result){
            return res.status(401).json({meaasge:"Ticket Not Found"})
        }
        res.json({ticket:result})
    }).catch((e)=>{
        console.log(e)
        return res.status(401).json({error:"some error are occured"})
    })
}


module.exports.addReply=(req,res)=>{
    const reply={
        text:req.body.text
    }
    console.log(reply)
    Ticket.findByIdAndUpdate(req.body.ticketId,{
        $push:{replys:reply}
    },{
        new:true
    }).then((result)=>{
        res.json({data:result})
    }).catch((e)=>{
        console.log(e)
        return res.json({error:"some error in reply"})
    })
}

module.exports.closeTicket=async(req,res)=>{
    const {id}=req.params    

    try{
        const ticket=await Ticket.findOne({_id:id})
        console.log(ticket)
        if(!ticket){
            return res.send({message:"Not found"})
        }
        ticket.status=false
        await ticket.save()
        res.json({ticketclose:ticket})

    }catch(e){
        console.log(e)
        return res.status(401).json({message:"Error in close ticket"})
    }
   
   

}