import React from 'react'

export default function PostCard() {
  return (
    <div className='col-md-3 mb-5'>
        <div className="card">
            <img src="https://picsum.photos/id/102/1000/1000" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">my awesome caption</p>
            </div>
            <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
            </div>
        </div>
    </div>
  )
}
