import React from 'react'

export default function PostCard(props) {
    const post = props.post;
    const date = new Date(post.createdAt);
    const date_str = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  return (
    <div className='col-md-3 mb-5'>
        <div className="card">
            <img src={post.image} className="card-img-top" alt="..." />
            <div className="card-body">
                <p className="card-text">{post.caption}</p>
            </div>
            <div className="card-footer">
                <small className="text-muted">{post.postedBy.name} - {date_str}</small>
            </div>
        </div>
    </div>
  )
}
