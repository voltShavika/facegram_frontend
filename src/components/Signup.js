import React,{useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {SIGNUP_API} from '../config/api';

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
    const [name,setName] = useState("");
    const [pass,setPass] = useState("");
    const [numb,setNumber] = useState("");
    const [email,setMail] = useState("");
    const [loading,setLoading] = useState(false);

    const [errors,setErrors] = useState([]);

    const navigate = useNavigate();

    const handleClick = () => {
        var formErrors = validateFormFields(name, pass, numb, email);
        if(formErrors.length < 1){
            setErrors([]);
            setLoading(true);
            axios.post(SIGNUP_API , {
                name:name,
                email:email,
                password:pass,
                number:numb

            }).then((res)=>{
                setLoading(false);
                console.log(res.data);
                if(res.data.code==1){
                    navigate("/dashboard")
                }else{
                    formErrors.push(res.data.msg);
                    setErrors([...formErrors]);
                }
            }).catch((e)=>{
                setLoading(false);
                formErrors.push("Something went wrong. Try Later");
                setErrors([...formErrors]);
               
            })
        }
        else{
            setErrors([...formErrors])
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
                        
                        
                        <input type="txt"  value = {name} onChange={(e)=> setName(e.target.value)} className='form-control' placeholder='Enter your name' />
                        <br/>
                        <input type="txt" value={email} onChange={(e)=>setMail(e.target.value)} className='form-control' placeholder='Enter your email-id' />
                        <br/>
                        <input type= "number" value={numb} onChange={(e)=> setNumber(e.target.value)} className='form-control' placeholder='Enter your phone number' />
                        <br/>
                        <input type="txt" value={pass} onChange={(e)=>setPass(e.target.value)} className='form-control' placeholder='Enter your password' />
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
