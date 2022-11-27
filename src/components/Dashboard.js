import axios from 'axios';
import React, {useState, useEffect} from 'react'
import Header from "./Header";
import PostCard from './PostCard';
import CreatePost from './CreatePost';

import {POSTS_API} from '../config/api'

function Dashboard() {
  
  const [posts, setPosts] = useState([]);
  const [loading,setLoading] = useState(false);
  
  const getPostCallback = (new_post) => {
    setPosts([new_post, ...posts]);
  }

  // useEffect(() => {
  //   console.log("API CALLED");
  //   setLoading(true);
  //   axios.get(POSTS_API).then((res) => {
  //     console.log(res.data.data);
  //     if(res.data.code===1){
  //       setLoading(false);
  //       setPosts([...res.data.data])
  //     }
     
  //   }).catch((e) => {
  //     setLoading(false);
  //     console.log(e);
  //   })
  // },[])

  return (
    <>
      <Header />
      <div className='container-fluid'>
        <CreatePost callback={getPostCallback} />
        <hr/>
        <div className='row'>
          <div className='col'> 
            <div className='row'>
              {
                loading && <h2>Loading...</h2>
              }
              {
                posts.map((post, i) => {
                  return <PostCard key={i} post={post} />
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
