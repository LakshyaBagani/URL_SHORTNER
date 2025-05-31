import React from 'react'
import Login from './auth/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './auth/Register';

function App() {
  return (
    <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Signup/>}/>
          </Routes>
    </BrowserRouter>
  )
}

export default App