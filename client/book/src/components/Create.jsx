import { Button, MenuItem, TextField } from '@mui/material'
import React, { useState } from 'react'
import axiosInstance from './axios';

const Create = () => {
    // select menu options
    const types = [
        {
            value: 'რომანი'

        },

        {
            value: 'მოთხრობა'

        },

        {
            value: 'პოემა'

        },

        {
            value: 'ლექსი'

        }
    ];

    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [desc, setDesc] = useState('');
    const [text, setText] = useState('');


    const handleCreate = async () => {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post('http://localhost:4000/api/create', {title, type, desc, text}, {
        headers: {
          Authorization: `Bearer ${token}`
      }
      });

      console.log(response.data);
    }

    const handleSelect = (e) => {
      setType(e.target.value);
    }
  return (
    <div>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-4xl pb-12'>შექმენით წიგნი</h1>
        <form className='flex flex-col gap-4 w-1/3'>
            <TextField label = "სათაური" variant='outlined' size="small"  onChange={(e) => setTitle(e.target.value)}/>
            <TextField
          id="outlined-select-currency"
          select
          value = {type}
          defaultValue='მოთხრობა'
          helperText="აირჩიეთ წიგნის ტიპი"
          size='small'
       
          onChange={handleSelect}
        >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
            {option.value}
            </MenuItem>
          ))}
        </TextField>
            <TextField label = "მოკლე აღწერა" variant='outlined' size="small" onChange={(e) => setDesc(e.target.value)}/>
            <TextField label = "წიგნის ტექსტი" variant='outlined' size="small" onChange={(e) => setText(e.target.value)}/>
            <Button variant='contained' color="success" onClick={handleCreate}>გამოქვეყნება</Button>
        </form>
      </div>
    </div>
  )
}

export default Create
