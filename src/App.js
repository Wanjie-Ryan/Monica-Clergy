import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegComponent from './pages/Register/reg'
import LoginComponent from './pages/Login/login'




function App (){

  return(

    <>

      <BrowserRouter>

        <Routes>

          <Route path= '/' element ={<RegComponent/>}/>
          <Route path= '/login' element ={<LoginComponent/>}/>


        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App