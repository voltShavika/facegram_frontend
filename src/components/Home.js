import React,{useRef, useState} from 'react'
import axios from 'axios';

import {Link, Navigate, useNavigate, Redirect} from 'react-router-dom';
import {LOGIN_API} from '../config/api'
import { useSelector, useDispatch } from 'react-redux';

import {callLoginApi, fetchLoginErr} from "../redux/user/actions"


const validateFormFields = (email,pass)=>{
  var errors = [];
  if(email.indexOf("@")=== -1){
    errors.push("Invalid Email");
  }
  if(pass.length<1){
    errors.push("Blank password not accepted");
  }
  return errors;

}

function Home() {

  const userData = useSelector((state) => state.user);
  const loggedIn = userData.loggedIn;
  const email = userData.email;
  const errors = userData.errors;
  const loading = userData.loading;

  const iemailRef = useRef();
  const ipassRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleClick = ()=>{
    var email_val = iemailRef.current.value;
    var password_val = ipassRef.current.value;
    var formErrors = validateFormFields(email_val, password_val);
    if(formErrors.length<1){
      dispatch(callLoginApi(email_val, password_val, navigate));
    }else{
      dispatch(fetchLoginErr(formErrors));
    } 
    
  }
  return (
    <>
      <div className='container-fluid' style={{backgroundColor: "#F5F4F5"}}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='row m-5'>
              <div className='card p-5'>
                <div className='text-center p-2'>
				  <img className="img-fluid" src={require("../images/logo-ls.png")} />
                </div>
				{
					errors.length > 0 && 
					<div className='alert alert-danger'>
						<ul>
						{
							errors.map((error,i)=>{
								return <li key={i}>{error}</li>

							})
						}
						</ul>
					</div>
				}
                <input ref={iemailRef} type="text" className='form-control' placeholder='Enter your email' />
                <br/>
                <input ref={ipassRef} type="password" className='form-control' placeholder='Enter your password' />
                <br />
                <div className='d-flex justify-content-center'>
                  {
                    loading && <h4>Loading....</h4>
                  }
                  <button onClick={handleClick} className='btn btn-primary'>Login</button>
                </div>
                <div className='text-center mt-3'>
                  <Link>Forgot your password ?</Link>
                </div>
              </div>
              
            </div>
            <div className='row m-5'>
              <div className='card p-3'>
                <div className='text-center'>
                  <p className='m-1'>Dont have an account ? <Link to='/signup'>Signup</Link> here</p>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='text-center'>
              <img className='float-end' style={{height: "100vh"}} src={require("../images/home_image.png")} />
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}


export default Home;
