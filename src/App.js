import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegComponent from './pages/Register/reg'





function App (){

  return(

    <>

      <BrowserRouter>

        <Routes>

          <Route path= '/' element ={<RegComponent/>}/>

        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App