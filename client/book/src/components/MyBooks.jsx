import React, { useContext, useEffect, useState } from 'react'
import { BookContext } from '../context/bookContext';
import { Button } from '@mui/material';
import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';


const MyBooks = () => {

       let navigate = useNavigate();

    const { books, setBooks , isDarkMode} = useContext(BookContext);
    const [myBook, setMyBook] = useState([]);

    useEffect(() => {
      const data = localStorage.getItem('filteredByName');
      if (data) {
        setMyBook(JSON.parse(data));
      }
    }, []);
  
    useEffect(() => {
      const name = localStorage.getItem('name');
      if (name && books.length > 0) {
        const filterByName = books.filter(item => item.author.name === name);
        setMyBook(filterByName);
        localStorage.setItem('filteredByName', JSON.stringify(filterByName));
      }

      console.log(myBook);
    }, [books]);

  // delete book
    const deleteBook = async (id) => {
       await axiosInstance.delete(`https://neowriters.onrender.com/api/books/del/${id}`);
       const filteredBook = books.filter(item => item._id !== id);
      setBooks(filteredBook);
      
      
    }

    // update book
    
    const updateBook = (id) => {
      navigate(`/books/${id}/update`)
    }

    
  return (
    <div className='flex flex-col' style = {{color: isDarkMode && '#fff'}}>
      <h1 className='text-4xl font-bold p-12'>ჩემი წიგნები</h1>
      <div className='flex flex-col md:flex-row items-center gap-12 p-12'>
      {myBook.length === 0 ? <p className='text-2xl'>თქვენ არ გაქვთ წიგნები</p> : (myBook.map((value) => (
        <div className='flex flex-col gap-4' key={value._id}> 
           <p className='text-xl font-semibold text-center'>{value.title}</p>
        <img src = {value.url} className='w-56 h-56 object-cover' />
      
        <Button variant='contained' color = "error" onClick={() => deleteBook(value._id)}>წაშლა</Button>
        <Button variant='contained' color = "success" onClick={() => updateBook(value._id)}>რედაქტირება</Button>
        </div>
      )))}
       </div>
    </div>
  )
}

export default MyBooks
