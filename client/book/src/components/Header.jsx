import React from 'react'
import {Button, TextField} from '@mui/material';

const Header = () => {
  return (
    <div className='w-full flex items-center justify-between px-12 py-6 shadow'>
      <div className="logo">
        <h1 className='text-3xl font-bold cursor-pointer'>მწერალი</h1>
      </div>

        <form className='flex items-center gap-4'>
            <TextField label = "ელ-ფოსტა" variant='outlined' size="small" className='w-44'/>
            <TextField label = "პაროლი" variant='outlined' size='small' type = "password" className='w-44'/>
            <Button variant='contained' color="success">შესვლა</Button>
        </form>
    </div>
  )
}

export default Header
