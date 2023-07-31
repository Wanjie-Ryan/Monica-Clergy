import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegComponent from './pages/Register/reg'
import LoginComponent from './pages/Login/login'
import DashComponent from './pages/dashboard/dash'



function App (){

  return(

    <>

      <BrowserRouter>

        <Routes>

          <Route path= '/' element ={<RegComponent/>}/>
          <Route path= '/login' element ={<LoginComponent/>}/>
          <Route path= '/dashboard' element ={<DashComponent/>}/>

        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App