
import React, { useContext, useState } from 'react'
import { BookContext } from '../context/bookContext'
import { Button, MenuItem, TextField } from '@mui/material'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from './axios';

const UpdateBook = () => {
    const { err } = useContext(BookContext);

    const [newTitle, setNewTitle] = useState('');
    const [newType, setNewType] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newText, setNewText] = useState('');
    const [newUrl, setNewUrl] = useState('');
    const [newPrice, setNewPrice] = useState(0);

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

    const handleSelect = (e) => {
        setNewType(e.target.value);
      }

      // take url from useParams
      const {id } = useParams();

      // navigate
      let navigate = useNavigate();

      // update function
      const handleUpdate = async () => {
        try {
           const updatedFields = {};

           if(newTitle) updatedFields.title = newTitle;
           if (newType) updatedFields.type = newType;
           if (newDesc) updatedFields.desc = newDesc;
           if (newText) updatedFields.text = newText;
           if (newUrl) updatedFields.url = newUrl;
           if (newPrice) updatedFields.price = newPrice;

            await axiosInstance.put(`${process.env.BASE_URL}/api/books/${id}/update`, 
               updatedFields
            );
            
            navigate('/profile');
        } catch (error) {
            console.error('Axios error:', error);
        }
    
      }
  
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <h2 className='text-4xl font-bold pb-12'>წიგნის რედაქტირება</h2>
       <form className='flex flex-col gap-4 w-4/5 md:w-1/3'>
            <TextField error = {err} label = "სათაური" variant='outlined' size="small" value = {newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
            <TextField
          id="outlined-select-currency"
          select
          value = {newType}
          defaultValue='მოთხრობა'
          helperText="აირჩიეთ წიგნის ტიპი"
          size='small'
          error = {err}
          onChange={handleSelect}
        >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
            {option.value}
            </MenuItem>
          ))}
        </TextField>
            <TextField error = {err} label = "მოკლე აღწერა" variant='outlined' value = {newDesc} size="small" onChange={(e) => setNewDesc(e.target.value)}/>
            <TextField error = {err} label = "წიგნის ტექსტი" variant='outlined' value = {newText} size="small" onChange={(e) => setNewText(e.target.value)}/>
            
            <TextField error = {err} label = "ყდის სურათი: " variant='outlined' value={newUrl} size="small" onChange={(e) => setNewUrl(e.target.value)}/>
            <TextField error = {err} label = "ფასი " variant='outlined' size="small" value = {newPrice} onChange={(e) => setNewPrice(e.target.value)}/>
            <Button variant='contained' color="success" onClick={handleUpdate}>რედაქტირება</Button>
        </form>
    </div>
  )
}

export default UpdateBook
