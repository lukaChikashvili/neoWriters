import React, { useContext, useEffect, useState } from 'react'
import { BookContext } from "../context/bookContext";
import axiosInstance from './axios';
import lari from '../assets/lari.png';
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Profile = () => {

  const { books, setBooks} = useContext(BookContext);
 
  const getAllBooks = async () =>{
      const data = await axiosInstance.get('http://localhost:4000/api/books');

      setBooks(data.data.books);
console.log(books);
   
  }

  useEffect(() => {
      getAllBooks();
  }, []);

  let navigate = useNavigate();

// navigate to full page
const fullPage = (id) => {
  navigate(`/books/${id}`);
}

  return (
    <div className='flex items-center gap-12 p-12'>
       {books.map((value) => (
        <div key={value._id}>
          <p className='text-center text-xl font-semibold pb-6'>{value.title}</p>
         
           <img src = {value.url} className='shadow-lg rounded-md cursor-pointer w-56 h-64 object-cover'  />
           <div className='flex items-center gap-12  '>
           <p className='flex items-center text-2xl pt-6 '>{value.price}<img src = {lari} className='w-8' /></p>
          <Button variant='contained' color = "success" className='absolute top-2 w-24' onClick={() => fullPage(value._id)}>ყიდვა</Button>
        </div>
         </div>
       ))}
    </div>
  )
}

export default Profile
