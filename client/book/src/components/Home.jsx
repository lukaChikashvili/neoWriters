import React from 'react'
import logo from '../assets/logo.png';
import { Button, TextField } from '@mui/material';

const Home = () => {
  return (
    <div className='flex items-center justify-around h-screen '>
       <div>
         <img src = {logo} />
       </div>

       <div className='w-1/3'>
        <form className='w-full flex flex-col gap-6'>
          <h1 className='text-4xl font-bold text-center'>რეგისტრაცია</h1>
          <TextField label = "სახელი" variant='outlined' size="small" />
        <TextField label = "გვარი" variant='outlined' size='small'/>
        <TextField label = "ქალაქი" variant='outlined' size='small'/>
        <TextField label = "პროფესია" variant='outlined' size="small" />
        <TextField label = "პაროლი" variant='outlined' size='small' type = "password" />
        <Button variant='contained' color = "success">რეგისტრაცია</Button>
        </form>
       </div>
    </div>
  )
}

export default Home
