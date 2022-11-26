import React,{useState} from 'react'
import axios from 'axios';

import {Link, useNavigate} from 'react-router-dom';
import {LOGIN_API} from '../config/api'


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
  const [iname,setName] = useState("");
  const [ipass,setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors,setErrors] = useState([]);

  const navigate = useNavigate();
  
  const handleClick = ()=>{
    var formErrors = validateFormFields(iname,ipass);
    if(formErrors.length<1){
      setErrors([]);
      setLoading(true);
      axios.post(LOGIN_API, {
        email: iname,
        password: ipass
      }).then(res => {
        setLoading(false);
        if(res.data.code == 1){
          console.log(res.data.msg);
          navigate("/dashboard")
        }
        else{
          formErrors.push(res.data.msg);
          setErrors([...formErrors]);
        }
      }).catch(e => {
        setLoading(false);
        formErrors.push("Something went wrong try Later");
        setErrors([...formErrors]);
      })
    }else{
      setErrors([...formErrors]);
    } 
    
  }
  return (
    <>
      <div className='container-fluid' style={{backgroundColor: "#F5F4F5"}}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='row m-5'>
              <div className='card p-5'>
                <div className='d-flex justify-content-center'>
                  <h1 style={{fontFamily: "Baskerville-SemiBoldItalic", fontSize: "60px"}}>facegram</h1>
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
                <input value={iname} onChange={(e)=> setName(e.target.value)} type="text" className='form-control' placeholder='Enter your email' />
                <br/>
                <input value={ipass} onChange={(e)=> setPass(e.target.value)} type="text" className='form-control' placeholder='Enter your password' />
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

// style={{display: "block", margin: 'auto'}}

export default Home;
