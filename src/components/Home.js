import React,{useState} from 'react'
import axios from 'axios';

import {Link, useNavigate} from 'react-router-dom';



const validateFormFields = (email,pass)=>{
  var errors = [];
  if(email.indexOf("@")=== -1){
    errors.push("type proper email");
  }
  if(pass.length<1){
    errors.push("blank password not excepted");
  }
  return errors;

}

function Home() {
  const [iname,setName] = useState("");
  const [ipass,setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors,setErrors] = useState([]);

  const navigate = useNavigate();
  var prod = false;
  var url = 'https://facegaram.herokuapp.com/api/login'
  if(!prod){
    url = "http://localhos/api/login"
  }
  const handleClick = ()=>{
    var formErrors = validateFormFields(iname,ipass);
    if(formErrors.length<1){
      setErrors([]);
      setLoading(true);
      axios.post(url, {
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
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-md-6'>
            <img className='img-fluid' src="https://img.freepik.com/free-psd/close-up-phone-mockup-chat_23-2149113173.jpg?size=626&ext=jpg" />
          </div>
          <div className='col-md-6'>
            <div className='row'>
                <div className='d-flex justify-content-center'>
                  <h1>Facegram</h1>
                </div>
                
                <ul>
                  {
                    errors.map((error,i)=>{
                        return <li key={i}>{error}</li>

                    })
                  }
                </ul>
                <input value={iname} onChange={(e)=> setName(e.target.value)} type="text" className='form-control' placeholder='Enter your email' />
                <br/>
                <input value={ipass} onChange={(e)=> setPass(e.target.value)} type="text" className='form-control' placeholder='Enter your password' />
                <br />
                <div className='d-flex justify-content-center'>
                  {
                    loading && <h4>Loading....</h4>
                  }
                  <button onClick={handleClick} className='form-control btn btn-primary'>Login</button>
                </div>
            </div>
            <div className='row'>
              <div className='d-flex justify-content-center'>
                <p>Dont have an account <Link to='/signup'>Signup</Link></p>
              </div>
            </div>
              
              
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
