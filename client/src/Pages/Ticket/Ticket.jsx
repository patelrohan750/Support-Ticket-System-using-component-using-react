import React, { useState, useEffect } from 'react'
import './Ticket.css'
import Model from './Model'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Ticket = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {

        fectTickets();
    }, [])
    const fectTickets = () => {
        axios.get('/tickes').then((result) => {
            console.log(result)
            setTickets(result.data.data)
        }).catch((e) => {
            console.log(e)
        })
    }
    console.log(tickets)
    return (
        <div className="support__ticket">
            <div className="page__heading">
                <div className="header">
                    <h1>SUPPORT TICKET</h1>
                </div>
                <div className="header__buttons">
                    <Model />
                </div>
            </div>

            {/* table */}
            <table className="table mt-5">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Ticket Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Message</th>
                        <th scope="col">Status</th>
                        <th scope="col">Replies</th>
                        <th scope="col"></th>

                    </tr>
                </thead>
                <tbody>
                    {tickets.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.message}</td>

                                <td>{
                                    item.status ? "Open" : "Close"

                                }</td>
                                <td>{item.replys.length}</td>
                                <td>
                                {
                                    item.status ? (
                                        <Link to={`ticket/${item._id}`}>
                                        <button type="button" class="btn btn-primary">View</button>
                                    </Link>
                                    ):null
                                }
                                   

                                </td>
                            </tr>
                        )
                    })

                    }
                </tbody>
            </table>
        </div>
    )
}

export default Ticket
