import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Home from './home'
import './App.css'
import Navigation from './navigation'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
    <BrowserRouter>
    <Navigation/>
     
    <Routes>
      <Route path="/" element={ <Home/>} />
    </Routes>
   
      
    </BrowserRouter>
     

    </>
  )
}

export default App
