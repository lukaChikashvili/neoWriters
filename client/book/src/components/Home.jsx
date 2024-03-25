import React, { useState } from 'react'
import logo from '../assets/logo.png';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const Home = () => {
  // register input states
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [proffesion, setProffesion] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    await axios.post('http://localhost:4000/api/register', {
      name, surname, email, password, location, proffesion
    });


  }

  return (
    <div className='flex items-center justify-around h-screen '>
       <div>
         <img src = {logo} />
       </div>

       <div className='w-1/3'>
        <form className='w-full flex flex-col gap-6'>
          <h1 className='text-4xl font-bold text-center'>რეგისტრაცია</h1>
        <TextField label = "სახელი" variant='outlined' size="small" onChange={(e) => setName(e.target.value)} />
        <TextField label = "გვარი" variant='outlined' size='small' onChange={(e) => setSurname(e.target.value)}  />
        <TextField label = "ელ-ფოსტა" variant='outlined' size='small' type='email' onChange={(e) => setEmail(e.target.value)}/>
        <TextField label = "ქალაქი" variant='outlined' size='small' onChange={(e) => setLocation(e.target.value)}/>
        <TextField label = "პროფესია" variant='outlined' size="small" onChange={(e) => setProffesion(e.target.value)} />
        <TextField label = "პაროლი" variant='outlined' size='small' type = "password" onChange={(e) => setPassword(e.target.value)} />
        <Button variant='contained' color = "success" onClick={handleRegister}>რეგისტრაცია</Button>
        </form>
       </div>
    </div>
  )
}

export default Home
