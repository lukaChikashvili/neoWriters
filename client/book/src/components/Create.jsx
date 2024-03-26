import { Button, MenuItem, TextField } from '@mui/material'
import React from 'react'

const Create = () => {
    // select menu options
    const type = [
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

  return (
    <div>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-4xl pb-12'>შექმენით წიგნი</h1>
        <form className='flex flex-col gap-4 w-1/3'>
            <TextField label = "სათაური" variant='outlined' size="small" />
            <TextField
          id="outlined-select-currency"
          select
          
          defaultValue="რომანი"
          helperText="აირჩიეთ წიგნის ტიპი"
          size='small'
        >
          {type.map((option) => (
            <MenuItem key={option.value} value={option.value}>
            {option.value}
            </MenuItem>
          ))}
        </TextField>
            <TextField label = "მოკლე აღწერა" variant='outlined' size="small"/>
            <TextField label = "წიგნის ტექსტი" variant='outlined' size="small"/>
            <Button variant='contained' color="success">გამოქვეყნება</Button>
        </form>
      </div>
    </div>
  )
}

export default Create
