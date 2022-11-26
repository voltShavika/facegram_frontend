import axios from 'axios';
import React, {useState, useEffect} from 'react'
import Header from "./Header";
import PostCard from './PostCard';

import {POSTS_API} from '../config/api'

function Dashboard() {
  
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    axios.get(POSTS_API).then((res) => {
      console.log(res.data);
    }).catch((e) => {
      console.log(e);
    })
  },[])

  return (
    <>
      <div className='container-fluid'>
        <Header />
        <div className='row'>
          <div className='col'>
            <button className='btn btn-danger' >Create New Post</button>
            
            <hr/>
            <div className='row'>
              {
                Array.from({length: 9}).map((_, i) => {
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
