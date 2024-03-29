import { Button, MenuItem, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from './axios';
import { BookContext } from "../context/bookContext";
import { useNavigate} from 'react-router-dom';

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

    let navigate = useNavigate();

    const { books, setBooks, useUrl,  selectedItemUrl} = useContext(BookContext);

    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [desc, setDesc] = useState('');
    const [text, setText] = useState('');
    const [url, setUrl] = useState(useUrl ?  selectedItemUrl : null);
    const [price, setPrice] = useState(0);

    useEffect(() => {
      const storedTitle = localStorage.getItem('title');
  if (storedTitle !== null) setTitle(JSON.parse(storedTitle));

  const storedType = localStorage.getItem('type');
  if (storedType !== null) setType(JSON.parse(storedType));

  const storedDesc = localStorage.getItem('desc');
  if (storedDesc !== null) setDesc(JSON.parse(storedDesc));

  const storedPrice = localStorage.getItem('price');
  if (storedPrice !== null) setPrice(JSON.parse(storedPrice));

  const storedText = localStorage.getItem('text');
  if (storedText !== null) setText(JSON.parse(storedText));
 
     }, []);
 
     useEffect(() => {
       localStorage.setItem('title', JSON.stringify(title));
       localStorage.setItem('type', JSON.stringify(type));
       localStorage.setItem('desc', JSON.stringify(desc));
       localStorage.setItem('text', JSON.stringify(text));
       localStorage.setItem('price', price);
       
     }, [title, type, desc, text, price]);

    const handleCreate = async () => {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post('http://localhost:4000/api/create', {title, type, desc, text, url, price}, {
        headers: {
          Authorization: `Bearer ${token}`
      }
      });

        setBooks([...books, response.data.book]);
        navigate('/profile');
      
    }

    const handleSelect = (e) => {
      setType(e.target.value);
    }


  return (
    <div>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-4xl pb-12'>შექმენით წიგნი</h1>
        <form className='flex flex-col gap-4 w-1/3'>
            <TextField label = "სათაური" variant='outlined' size="small" value = {title} onChange={(e) => setTitle(e.target.value)}/>
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
            <TextField label = "მოკლე აღწერა" variant='outlined' value = {desc} size="small" onChange={(e) => setDesc(e.target.value)}/>
            <TextField label = "წიგნის ტექსტი" variant='outlined' value = {text} size="small" onChange={(e) => setText(e.target.value)}/>
            
            <TextField label = "ყდის სურათი: " variant='outlined' value={selectedItemUrl} size="small" onChange={(e) => setUrl(e.target.value)}/>
            <TextField label = "ფასი " variant='outlined' size="small" value = {price} onChange={(e) => setPrice(e.target.value)}/>
            <Button variant='contained' color="success" onClick={handleCreate}>გამოქვეყნება</Button>
        </form>
      </div>
    </div>
  )
}

export default Create
