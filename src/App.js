import React from 'react'
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import { Provider } from 'react-redux';
import store from "./redux/store";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate


}from 'react-router-dom'
import Test from './components/Test';
function App() {
  
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/test" element={<Test/>}></Route>
          <Route exact path="/" element={<Home/>} ></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
          <Route exact path="/dashboard" element={<Dashboard/>}></Route>
          <Route exact path="*" element={<h1>Error 404</h1>}></Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App;