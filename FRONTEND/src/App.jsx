import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Login from './auth/Login';
import Signup from './auth/Register';


function App() {
  return (
    <BrowserRouter>
          <Routes>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Signup/>}/>
          </Routes>
    </BrowserRouter>
  )
}

export default App