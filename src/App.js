import React from 'react'
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate


}from 'react-router-dom'
function App() {
  
  return (
    <>
      <Signup />
    </>
  )
}

export default App;