import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png';
import { Button, TextField } from '@mui/material';

import axiosInstance from './axios';



const Home = () => {
  // register input states
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [proffesion, setProffesion] = useState('');
  const [password, setPassword] = useState('');

// register err
const [registerErr, setRegisterErr] = useState(false);

// sucessful register 
const [success, setSuccess] = useState(false);


  // register users
  const handleRegister = async (e) => {
    e.preventDefault();

    if(!name || !surname || !email || !password || !location || !proffesion) {
     setRegisterErr(true);
    }else {
      try {
        await axiosInstance.post('http://localhost:4000/api/register', {
         name, surname, email, password, location, proffesion
       });
        setSuccess(true);
     } catch (error) {
       setRegisterErr(true);
     }
       
    }
    
    

  }

  return (
  
    <div className='flex items-center justify-around h-screen '>

       <div>
         <img src = {logo} />
       </div>
 
 <div className='w-1/3'>
 <form className='w-full flex flex-col gap-6' onSubmit={handleRegister}>
   <h1 className='text-4xl font-bold text-center'>რეგისტრაცია</h1>
 <TextField error = {registerErr && !name}  label = "სახელი" variant='outlined' size="small" onChange={(e) => setName(e.target.value)} />
 <TextField error = {registerErr && !surname} label = "გვარი" variant='outlined' size='small' onChange={(e) => setSurname(e.target.value)}  />
 <TextField error = {registerErr && !email} label = "ელ-ფოსტა" variant='outlined' size='small' type='email' onChange={(e) => setEmail(e.target.value)}/>
 <TextField error = {registerErr && !location} label = "ქალაქი" variant='outlined' size='small' onChange={(e) => setLocation(e.target.value)}/>
 <TextField error = {registerErr && !proffesion} label = "პროფესია" variant='outlined' size="small" onChange={(e) => setProffesion(e.target.value)} />
 <TextField error = {registerErr && !email} label = "პაროლი" variant='outlined' size='small' type = "password" onChange={(e) => setPassword(e.target.value)} />
 <Button variant='contained' color = "success" type='submit'>რეგისტრაცია</Button>
  {success && <p className='text-4xl font-bold'>sucesss</p>}
 </form>

   
</div>

   
    </div>
  )
}

export default Home
