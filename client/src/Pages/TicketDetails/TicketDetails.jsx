import React, { useState, useEffect } from 'react'
import './TicketDetails.css'
import { useParams,useHistory } from 'react-router'
import axios from 'axios'
import Replys from './Replys'
const TicketDetails = () => {
    const { id } = useParams();
    let history=useHistory();
    const [ticket, setTicket] = useState('')
    const [replys, setReplys] = useState([])
    useEffect(() => {
        loadTicket();
    }, [replys])
    const loadTicket = () => {
        axios.get(`/ticket/${id}`).then((result) => {
            // console.log(result.data.ticket)
            setTicket(result.data.ticket)
            setReplys(result.data.ticket.replys)
            // var date=new Date(result.data.ticket.createdAt)
            // console.log(date.toDateString())
        }).catch((e) => {
            console.log(e)
        })
    }
    const dateFormat = (date) => {
        var today = new Date(date)
        return today.toDateString();
    }
    const dateTimeFormat = (date) => {
        var today = new Date(date)
        var time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        var date = today.toDateString();
        return `${date} ${time}`
    }
  
    const makeReply = (text, ticketId) => {
        console.log("reply work..")
        console.log(text)
        axios.put('/reply', {
            text, ticketId
        }).then((result) => {
            console.log(result.data.data.replys)
            setReplys([...replys, result.data.data.replys])
        }).catch((e) => {
            console.log(e)
        })
    }
    const closeTicket=()=>{
        const ticketId=ticket._id
        console.log("clicked")
        axios.get(`/closeticket/${ticketId}`).then((result)=>{
            console.log(result)
            history.push('/ticket')
          

        }).catch((e)=>{
            console.log(e)
        })
      
        console.log("clicked next")
    }
  

    return (
        <div className="ticket__details">
            <h1 className="my-2">Diccussion on Ticket: <strong>#{ticket._id}</strong></h1>
            <div className="card mt-3 p-3">
                <h5 className="card-title"><span style={{ color: "#0d6efd" }}>created date:</span><span style={{ fontSize: "18px" }}>{dateFormat(ticket.createdAt)}</span></h5>
                <h5 className="card-title"><span style={{ color: "#0d6efd" }}>user:</span>
                    <span style={{ fontSize: "18px" }}>{ticket.name}</span></h5>
            </div>

            <div className="my-3 replys1">
                <Replys name={ticket.name} message={ticket.message} poston={
                    dateTimeFormat(ticket.createdAt)
                } />
            </div>

            <div className="replys">
                {
                    replys.map((item, index) => {
                        return (
                            <Replys key={index} name={ticket.name} message={item.text} poston={
                                dateTimeFormat(ticket.updatedAt)
                            } />
                        )
                    })
                }
            </div>

            <div className="form">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    makeReply(e.target[0].value, ticket._id)
                    e.target.reset()
                }}>

                    <label className="form-label">Add Your Reply</label>
                    <textarea className="form-control"
                        placeholder="please post a reply" required
                    />

                    <button type="submit" class="btn btn-primary mt-1 me-2">Reply</button>
                   

                </form>
                <button  onClick={closeTicket} class="btn btn-success mt-2">Close Ticket</button>
              
            </div>

        </div>
    )
}

export default TicketDetails
