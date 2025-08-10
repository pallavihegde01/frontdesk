import React from 'react'
import {  Navigate, Route, Routes } from 'react-router';
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from './pages/SignupPage.jsx';
import Layout from './components/Layout.jsx';
import LoginPage from "./pages/LoginPage.jsx";
import { Toaster } from 'react-hot-toast';
import QueuemanagementPage from './pages/QueuemanagementPage.jsx';
import AppointmentPage from './pages/AppointmentPage.jsx'
import useAuthUser from './hooks/useAuthUser.js';


const App = () => {

  const { isLoading, isAuthenticated } = useAuthUser();

  return (
    <div data-theme="night" className='h-screen' >
      <Routes>
        <Route path='/' element={isAuthenticated?(<Layout><HomePage/></Layout>):(<Navigate to="/login"/>)}/>
        <Route path='/signup' element={!isAuthenticated ? <SignUpPage/> : <Navigate to="/"/>}/>
        <Route path='/login' element={!isAuthenticated ? <LoginPage/> :<Navigate to="/"/>}/>
        <Route path='/queue' element={<Layout><QueuemanagementPage/></Layout>}/>
        <Route path='/appointment' element={<Layout><AppointmentPage/></Layout>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App