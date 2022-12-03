import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

import { Create_post_API } from '../config/api';



const validation = (caption,image)=>{
    var errors = [];
    if(image.length == 0){
        errors.push("Image cant be blank");

    }
    if(caption.length < 1){
        errors.push("Caption cant be empty");
    }
    return errors;

}

export default function CreatePost(props) {
    const [caption,setCaption] = useState("");
    const [image,setImage] = useState("");
    const [errors,setErrors] = useState([]);
    const [loading,setLoading] = useState(false);
    const userData = useSelector((state)=>state.user.userObj);

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setCaption("");
        setImage("");
        setErrors([]);
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleCreate = ()=>{
        console.log("I am called");
        var formErrors = validation(caption,image);
        console.log(formErrors);
        if(formErrors.length<1){
            setErrors([]);
            setLoading(true);
            axios.post(Create_post_API,{
                posted_by:userData.email,
                caption:caption,
                image:image
            }).then((res)=>{
                setLoading(false);
                setShow(false);
                if(res.data.code===1){
                    props.callback(res.data.data);
                }else{
                    formErrors.push(res.data.msg);
                    setErrors([...formErrors]);
                }
            }).catch((e)=>{
                setLoading(false);
                formErrors.push("something is wrong");
                setErrors([...formErrors]);
            })
        }else{
            console.log("I am in error");
            setErrors([...formErrors]);
        }
    }
    return (
    <div className='row'>
        <div className='col-md-4 p-3'>
            <Button variant="primary" onClick={handleShow}>
                Create new Post
            </Button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard="false">
                <Modal.Header closeButton>
                    <Modal.Title>Create an Amazing Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        errors.length > 0 &&
                        <div className="alert alert-danger">
                            <ul>
                                {
                                    errors.map((err,i)=>{
                                        return <li key={i}>{err}</li>

                                    })
                                }
                            </ul>
                        </div>

                    }
                    <div className="mb-3">
                        <label className="form-label" >Caption</label>
                        <input type="email" className="form-control" id="caption" value={caption} onChange={(e)=> setCaption(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image URL</label>
                        <input type="text" className="form-control" id="url"  value={image} onChange={(e)=> setImage(e.target.value)}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {
                        loading && <h5>Loading........</h5>
                    }
                    <Button variant="secondary" onClick={handleClose}>
                        Discard
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        Post It
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    </div>
    )
}
