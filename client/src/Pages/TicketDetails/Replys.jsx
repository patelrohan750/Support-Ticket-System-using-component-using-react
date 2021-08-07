import React from 'react'
import './reply.css'
import { ImUser } from "react-icons/im";
const Replys = ({name,message,poston}) => {
    return (
        <div className="mb-2">

            <div className="card">
                <div className="card-header d-flex justify-content-between">
                <div className="user">
                <ImUser/> <span>{name}</span>
                </div>
                <div className="poston">
                    <h6><span style={{color:"#0d6efd"}}>Post On</span><span style={{fontSize:"18px"}}>{poston}</span></h6>
                </div>
                  
                </div>

                <div className="card-body">
                    <p className="card-text">{message}</p>
                </div>
            </div>

        </div>
    )
}

export default Replys
