import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router';
import Header from "./Header";
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import { useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {POSTS_API, LIKE_API} from '../config/api'
import AddComment from './AddComment';

function Dashboard() {
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const userData = useSelector((state) => state.user);

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [modalPostId, setModalPostId] = useState(null);

  const handleModalClose = () => {
    setModalPostId(null);
    setShowCommentModal(false);
    
  }

  const handleModalShow = (post_index) => {
    setModalPostId(post_index);
    setShowCommentModal(true);
  }

  const handleAddComment = () => {

  }

  const getPostCallback = (new_post) => {
    setPosts([new_post, ...posts]);
  }

  const likeCallback = (post_index) => {
    console.log("Like Called " + post_index);
    axios.post(LIKE_API + posts[post_index]._id,{
        email:userData.userObj.email,
        }).then((res)=>{
            console.log(res.data);
            if(res.data.code===1){
                const oldPosts = [...posts];
                oldPosts[post_index].likes = res.data.data.likes;
                setPosts(oldPosts);

            }
        }).catch((e)=>{
            console.log(e);
            // setLoading(false);
            // formErrors.push("something is wrong");
            // setErrors([...formErrors]);
        })
  }

  const addCommentCallback = (pi, new_comments) => {
    const oldPosts = [...posts];
    oldPosts[pi].comments = new_comments;
    setPosts(oldPosts);
  }

  useEffect(() => {
    console.log("API CALLED");
    setLoading(true);
    axios.get(POSTS_API).then((res) => {
      console.log(res.data.data);
      if(res.data.code===1){
        setLoading(false);
        setPosts([...res.data.data])
      }
     
    }).catch((e) => {
      setLoading(false);
      console.log(e);
    })
  },[])

  return (
    <>
      {
        !userData.userObj && <Navigate to="/" />
      }
      <Header name={userData.userObj != null? userData.userObj.name: ""}/>
      <div className='container-fluid'>
		
        <CreatePost callback={getPostCallback}/>
        <AddComment pi={modalPostId} post={modalPostId>=0?posts[modalPostId]:null} addCommentCallback={addCommentCallback} show={showCommentModal} handleClose={handleModalClose} handleAddComment={handleAddComment}/>
        <h2>Browse</h2>
        <hr/>
        <div className='row'>
          <div className='col'> 
            <div className='row'>
              {
                loading && <h2>Loading...</h2>
              }
              {
                posts.map((post, i) => {
                  return <PostCard key={i} post={post} pi={i} likeCallback={likeCallback} showCommentModal={handleModalShow}/>
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
