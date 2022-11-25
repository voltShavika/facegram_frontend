import React,{useState} from 'react';
import axios from 'axios';

export default function Signup() {
    const [name,setName] = useState("");
    const [pass,setPass] = useState("");
    const [numb,setNumber] = useState("");
    const [email,setMail] = useState("");
    const [loading,setLoading] = useState(false);
    var prod = false;
    var url = 'https://facegaram.herokuapp.com/api/signup'
    if(!prod){
        url = "http://localhost/api/signup"
    }
    const handleClick = ()=>{
        setLoading(true);
        axios.post(url , {
            name:name,
            email:email,
            password:pass,
            number:numb

        }).then((res)=>{
            setLoading(false);
            console.log(res.data);
        }).catch((e)=>{
            console.log(e);
        })
    }

  return (
    <>
        <div className='container'>
            <div className='row'>
                <div className='col-md-4'></div>
                <div className='col-md-4'>
                    <div className='d-flex justify-content-center mt-5'>
                        <h1>Facegram</h1>
                    </div>
                    <p>Signup to create and see posts of community</p>
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
                    <button onClick={handleClick} className='btn btn-primary form-control'>Sign up</button>
                </div>
                <div className='col-md-4'></div>
            </div>
            
        </div>
    </>
  )
}
