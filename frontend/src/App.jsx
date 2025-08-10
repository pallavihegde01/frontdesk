import React from 'react'
import {  Route, Routes } from 'react-router';
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from './pages/SignUpPage.jsx';
import Layout from './components/Layout.jsx';
import LoginPage from "./pages/LoginPage.jsx";
import { Toaster } from 'react-hot-toast';
import QueuemanagementPage from './pages/QueuemanagementPage.jsx';
import AppointmentPage from './pages/AppointmentPage.jsx'


const App = () => {
  
  return (
    <div data-theme="night" className='h-screen' >
      <Routes>
        <Route path='/' element={<Layout><HomePage/></Layout>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/queue' element={<Layout><QueuemanagementPage/></Layout>}/>
        <Route path='/appointment' element={<Layout><AppointmentPage/></Layout>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App