import React from 'react'
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom'

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} ></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
          <Route exact path="/dashboard" element={<Dashboard/>}></Route>
          <Route exact path="*" element={<h1>Error 404</h1>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;