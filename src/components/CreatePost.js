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
    const [image,setImage] = useState("");
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
        <div className='col-md-4 p-3'>
            
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Create a new Post
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Create new post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {
                                errors.length > 1 &&
                                <div class="alert alert-danger">
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
                                <label for="caption" class="form-label" >Caption</label>
                                <input type="email" class="form-control" id="caption" value={caption} onChange={(e)=> setCaption(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label for="url" class="form-label">Image URL</label>
                                <input type="text" class="form-control" id="url"  value={image} onChange={(e)=> setImage(e.target.value)}/>
                            </div>
                        
                        </div>
                        <div className="modal-footer">
                            {
                                loading && <h5>Loading........</h5>
                            }
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Create</button>
                        </div>
                    </div>
                </div>
            </div> 




        </div>
    </div>
    )
}
