import { logDOM } from '@testing-library/react';
import React from 'react'
import Header from "./Header";
import PostCard from './PostCard';

function Dashboard() {
  return (
    <>
      <div className='container-fluid'>
        <Header />
        <div className='row'>
          <div className='col'>
            <button className='btn btn-danger'>Create New Post</button>
            <hr/>
            <div className='row'>
              {
                Array.from({length: 9}).map((_, i) => {
                  console.log("I am in array");
                  return <PostCard key={i} />
                })
              }
            </div>
            
          </div>
          
        </div>
      </div>
    </>

    
  )
}

export default Dashboard;
