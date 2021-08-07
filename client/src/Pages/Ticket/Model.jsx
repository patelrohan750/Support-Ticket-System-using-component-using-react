import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom'
import axios from 'axios'
const Model = () => {
    const history = useHistory();
    const { register, handleSubmit, reset, formState: { errors }, setError, setValue } = useForm();
    const [successMsg, setSuccessMsg] = useState(false)

    const onSubmitHandler = (data, e) => {
        console.log(data);
        console.log(data.ticketImage[0])
        const formdata=new FormData();
        formdata.append("message",data.message);
        formdata.append("name",data.name);
        formdata.append("ticketImage",data.ticketImage[0]);

        axios.post('/add/ticket',formdata).then((result) => {
            console.log(result)
            window.location.reload(false);
        }).catch((err) => {
            console.log(err)
        })
        setSuccessMsg(true)
        reset('', {
            keepValues: false,
        })
        e.target.reset();

    }
    // const fileHandler = register('ticketImage', {
    //     required: "attachment is required"

    // })
    // const fileOnchangeHandler = (e) => {
    //     console.log(e.target.files);
    //     let file = e.target.files[0].type
    //     console.log(file);
    //     if (file !== "image/png") {
    //         alert("hii")
    //         // setError('attachment', {
    //         //     type: "manual",
    //         //     message: "Please upload file having extension .jpg, .jpeg, .png"
    //         // })

    //         // setValue('attachment',null)
    //         console.log(errors);
    //     }
    // }
    console.log(errors);
    return (
        <div>
            {
                successMsg && (
                    <div className="alert alert-success" role="alert">
                        A Successfully created Ticket
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )
            }

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Create New Ticket
            </button>


            {/* model */}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal Create New Ticket</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" placeholder="Enter Name Here"
                                        {...register('name', {
                                            required: "name is required"

                                        })}

                                    />
                                    <p className="custom_error"> {errors.name?.message}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Message</label>
                                    <textarea className="form-control" name="message" id="exampleFormControlTextarea1" rows="3"
                                        {...register('message', {
                                            required: "message is required"

                                        })}

                                    />
                                    <p className="custom_error"> {errors.message?.message}</p>
                                </div>

                                <div className="mb-3">
                                    {/* <label  className="form-label">Default file input example</label> */}
                                    <input className="form-control" type="file"  filename="ticketImage"

                                        {...register('ticketImage', {
                                            required: "attachment is required"

                                        })}
                                    />
                                     <p className="custom_error"> {errors.ticketImage?.message}</p>
                                   

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Model
