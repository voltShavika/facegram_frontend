import React,{useState, useRef} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {SIGNUP_API} from '../config/api';
import { useSelector,useDispatch } from 'react-redux';
import { callSignupApi, fetchSignupErr } from '../redux/user/actions';

const validateFormFields = (name, pass, number, email) => {
    var errors = [];
    if(name.length < 2){
        errors.push("Name should be longer than 2")
    }
    if(pass.length < 8){
        errors.push("Password should be longer than 8")
    }
    if(email.indexOf("@") === -1){
        errors.push("Enter a proper email id")
    }
    if(number.length !== 10){
        errors.push("Number should of 10 digit")
    }
    return errors;
}

export default function Signup() {
    const nameRef = useRef();
    const passRef = useRef();
    const emailRef = useRef();
    const numRef = useRef();

    const errors = useSelector((state)=>state.user.errors);
    const loading = useSelector((state)=>state.user.loading);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        const name = nameRef.current.value;
        const pass = passRef.current.value;
        const numb = numRef.current.value;
        const email  = emailRef.current.value;

        

        var formErrors = validateFormFields(name, pass, numb, email);
        if(formErrors.length < 1){
            dispatch(callSignupApi(name,pass,email,numb,navigate))
            
        }
        else{
            dispatch(fetchSignupErr(formErrors));
        }
        
    }

  return (
    <>
        <div className='container-fluid' style={{height: "100vh", backgroundColor: "#F5F4F5"}}>
            <div className='row'>
                <div className='col-md-4'></div>
                <div className='col-md-4 m-4'>
                    <div className='card p-5'>
                        <div className='text-center mt-2'>
                            <img className="img-fluid" src={require("../images/logo-ls.png")} />
                            <p className="mt-1">Signup to create and see posts of community</p>
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
                        
                        
                        <input type="text"  ref={nameRef} className='form-control' placeholder='Enter your name' />
                        <br/>
                        <input type="text" ref={emailRef} className='form-control' placeholder='Enter your email-id' />
                        <br/>
                        <input type= "number" ref={numRef}  className='form-control' placeholder='Enter your phone number' />
                        <br/>
                        <input type="text"  ref={passRef} className='form-control' placeholder='Enter your password' />
                        <br/>
                        {
                            loading && <h6>Loading......</h6>
                        }
                        <button onClick={handleClick} className='btn btn-primary'>Sign up</button>
                        <div className='text-center mt-3'>
                            <p>Have account already <Link to="/">Login</Link> here</p>
                        </div>
                    </div>
                    
                </div>
                <div className='col-md-4'></div>
            </div>
            
        </div>
    </>
  )
}
