import React,{useState} from 'react'
import axios from 'axios';

function Home() {
  const [iname,setName] = useState("");
  const [ipass,setPass] = useState("");
  const [loading, setLoading] = useState(false);
  var prod = false;
  var url = 'https://facegaram.herokuapp.com/api/login'
  if(!prod){
    url = "http://localhost/api/login"
  }
  const handleClick = ()=>{
    setLoading(true);
    axios.post(url, {
      email: iname,
      password: ipass
    }).then(res => {
      setLoading(false);
      if(res.data.code == 1){
        console.log(res.data.msg);
      }
      else{
        console.log("No Bro, Wrong Password")
      }
    }).catch(e => {
      console.log(e);
    })
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
                {
                  loading && <h4>Loading....</h4>
                }
                <input value={iname} onChange={(e)=> setName(e.target.value)} type="text" className='form-control' placeholder='Enter your email' />
                <br/>
                <input value={ipass} onChange={(e)=> setPass(e.target.value)} type="text" className='form-control' placeholder='Enter your password' />
                <br />
                <div className='d-flex justify-content-center'>
                  <button onClick={handleClick} className='form-control btn btn-primary'>Login</button>
                </div>
            </div>
            <div className='row'>
              <div className='d-flex justify-content-center'>
                <p>Dont have an account <a href='/api/signup'>Signup</a></p>
              </div>
            </div>
              
              
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
