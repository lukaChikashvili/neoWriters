import React, { useState } from 'react'
import {Button, TextField} from '@mui/material';

import {Link, useNavigate} from 'react-router-dom';
import axiosInstance from './axios';

const Header = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
   const isUserLoggedIn = localStorage.getItem('token');

  let navigate = useNavigate();

const handleLogin = async () => {
  const response = await axiosInstance.post('http://localhost:4000/api/login', {name, password});
  const token = response.data.token;
  localStorage.setItem('token', token);
  localStorage.setItem('name', response.data.name);

  navigate('/profile');
    

}


const logout = () => {
  localStorage.removeItem('token');
  navigate('/');
}

  return (
    <div className='w-full flex items-center justify-between px-12 py-6 shadow'>
      <div className="logo">
        <h1 className='text-3xl font-bold cursor-pointer'>მწერალი</h1>
      </div>
       {isUserLoggedIn ? (
        <div className='flex items-center gap-8 '>
       <Button variant='outlined' color = "success"> <Link to = "/create" className='text-md'>წიგნის დაწერა</Link></Button>
        <p className='text-2xl font-semibold'>{localStorage.getItem('name')}</p>
         <Button variant='contained' color="success" onClick={logout}>გასვლა</Button>
         </div>
       ) : (
        <form className='flex items-center gap-4'>
         <TextField label = "სახელი" variant='outlined' size="small" className='w-44' onChange={(e) => setName(e.target.value)}/>
         <TextField label = "პაროლი" variant='outlined' size='small' type = "password" className='w-44' onChange={(e) => setPassword(e.target.value)}/>
         <Button variant='contained' color="success" onClick={handleLogin}>შესვლა</Button>
     </form>
       )}
        
    </div>
  )
}

export default Header
