import axios from 'axios';
import React, { useState } from 'react'
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
    const [image,setimage] = useState("");
    const [errors,setErrors] = useState([]);
    const [loading,setLoading] = useState(false);

    const handleClick = ()=>{
        var formErrors = validation(caption,image);
        if(formErrors.length<1){
            setErrors([]);
            setLoading(true);
            axios.post(Create_post_API,{
                posted_by:"shavika619@gmail.com",
                caption:caption,
                image:image
            }).then((res)=>{
                setLoading(false);
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
            setErrors([...formErrors]);
        }
    }
    return (
    <div className='row'>
        <div className='col-md-4'>
            <h4>Create a new and exciting post!!!</h4>
            <ul>
            {
                errors.map((err,i)=>{
                    return <li key={i}>{err}</li>

                })
            }
            </ul>
            <input className='form-control' type="text" value={caption} onChange={(e)=> setCaption(e.target.value)} placeholder="Enter your Caption" />
            <br/>
            <input className='form-control' type="text" value={image} onChange={(e)=> setimage(e.target.value)} placeholder="Enter your Image URL" />
            {
                loading && <h5>Loading........</h5>
            }
            <br/>
            <button onClick={handleClick} className='btn btn-primary'>Click here to post</button>
        </div>
    </div>
    )
}
