import React, { useRef, useState } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { COMMENT_API } from '../config/api';

export default function AddComment(props) {
    const userObj = useSelector(state => state.user.userObj);
    const [show, setShow] = useState(false);
    const commentInputRef = useRef();
    
    const post = props.post;
    console.log(post);
    
    const handleEnterPress = (e) => {
        const code = e.keyCode || e.which;
        if(code === 13 && commentInputRef.current.value.length > 0){
            console.log("Enter Pressed " + commentInputRef.current.value);
            axios.post(COMMENT_API + post._id,{
                email: userObj.email,
                comment: commentInputRef.current.value
                }).then((res)=>{
                    console.log(res.data);
                    if(res.data.code===1){
                        props.addCommentCallback(props.pi, res.data.data.comments);
                        commentInputRef.current.value = ""
                    }
                }).catch((e)=>{
                    commentInputRef.current.value = ""
                })   
        }
    }
    
    

  return (
    <>
        {
            post && 
            <Modal show={props.show} fullscreen={true} onHide={props.handleClose} backdrop="static" keyboard="false">
            <Modal.Header closeButton>
                <Modal.Title>Post ID: {post._id} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-md-7'>
                        <img src={post.image} className="img-fluid" style={{height: "70vh"}} />
                    </div>
                    <div className='col-md-5'>
                        <h5>{post.postedBy.name}</h5>
                        <p>{post.caption}</p>
                        <small className="text-muted">{post.likes.length} Likes </small>
                        <small className="text-muted ps-2">{post.comments.length} Comment </small>
                        <hr />
                        <div className="card">
                            <div className="card-header">
                                All Comments
                            </div>
                            <ul className="list-group list-group-flush">
                                {
                                    post.comments.map((comment, i) => {
                                        let date_str = new Date(comment.at);
                                        date_str = date_str.getDate() + "/" + date_str.getMonth()
                                        return (
                                            <li key={i} className="list-group-item">
                                                <span className='text-muted'>{date_str}:  </span>
                                                {comment.text}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className="card-footer">
                                <input ref={commentInputRef} onKeyPress={(e)=>handleEnterPress(e)} className='form-control' type="text" placeholder='Add a comment. Press Enter to send' />
                            </div>
                        </div>
                        
                    </div>
                    
                </div>     
            </Modal.Body>
            <Modal.Footer>
                
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        }
    </>
  )
}
