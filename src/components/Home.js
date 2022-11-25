import React from 'react'

function Home() {
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
                <br />
                <input type="text" className='form-control' placeholder='Enter your email' />
                <input type="text" className='form-control' placeholder='Enter your password' />
                <div className='d-flex justify-content-center'>
                  <button className='form-control btn btn-primary'>Login</button>
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
