import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function PostCard(props) {
    const userObj = useSelector(state=> state.user.userObj);
    const post = props.post;
    const date = new Date(post.createdAt);
    const date_str = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

    
  return (
    <div className='col-md-4 mb-5'>
        <div className="card">
            <div className="card-footer">
                <small className="text-muted">{post.postedBy.name} - {date_str}</small>
            </div>
            <img src={post.image} className="card-img-top" alt="..." />
            <div className="card-body">
                <p className="card-text">{post.caption}</p>
            </div>
            <div className="card-footer">
                <div className='row'>
                    <div className='col'>
                    {
                        post.likes.indexOf(userObj._id) < 0?
                        <button className='btn btn-small btn-primary' onClick={() => props.likeCallback(props.pi)}>
                            Like
                        </button>:
                        <button className='btn btn-small btn-danger' onClick={() => props.likeCallback(props.pi)}>
                            Unlike
                        </button>
                    }
                    </div>
                    <div className='col d-flex align-items-center justify-context-center'>
                        <small className="text-muted">{post.likes.length} Likes </small>
                    </div>
                    <div className='col'>
                        <button className='btn btn-small btn-warning' onClick={() => props.showCommentModal(props.pi)}>
                            {post.comments.length} Comments
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}
