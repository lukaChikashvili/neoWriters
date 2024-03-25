import React, { useState } from 'react'
import {Button, TextField} from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Header = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const isUserLoggedIn = localStorage.getItem('token');

  let navigate = useNavigate();

const handleLogin = async () => {
  const response = await axios.post('http://localhost:4000/api/login', {email, password});
  const token = response.data.token;
  localStorage.setItem('token', response.data.token);

console.log(response.data)
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
         <Button variant='contained' color="success" onClick={logout}>გასვლა</Button>
        
       ) : (
        <form className='flex items-center gap-4'>
         <TextField label = "ელ-ფოსტა" variant='outlined' size="small" className='w-44' onChange={(e) => setEmail(e.target.value)}/>
         <TextField label = "პაროლი" variant='outlined' size='small' type = "password" className='w-44' onChange={(e) => setPassword(e.target.value)}/>
         <Button variant='contained' color="success" onClick={handleLogin}>შესვლა</Button>
     </form>
       )}
        
    </div>
  )
}

export default Header
