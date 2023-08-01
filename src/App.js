import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegComponent from './pages/Register/reg'
import LoginComponent from './pages/Login/login'
import ProjectComponent from './pages/projects/projects'
import EventComponent from './pages/Events/events'




function App (){

  return(

    <>

      <BrowserRouter>

        <Routes>

          <Route path= '/' element ={<RegComponent/>}/>
          <Route path= '/login' element ={<LoginComponent/>}/>
          <Route path= '/project' element ={<ProjectComponent/>}/>
          <Route path= '/events' element ={<EventComponent/>}/>


        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App