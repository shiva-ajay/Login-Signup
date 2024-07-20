import React from 'react'
import { Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomePage from './components/HomePage';


const App = () => {
  return (
   <Routes>
    <Route path = '/login' element={<LoginPage />}/>
    <Route path = '/signup' element={<SignupPage />}/>
    <Route path = '/' element={<HomePage />}/>
   </Routes>
    
  )
}

export default App