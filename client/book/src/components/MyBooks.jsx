import React, { useContext, useEffect, useState } from 'react'
import { BookContext } from '../context/bookContext';
import { Button } from '@mui/material';
import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';


const MyBooks = () => {

       let navigate = useNavigate();

    const { books, setBooks } = useContext(BookContext);
    const [myBook, setMyBook] = useState([]);

    useEffect(() => {
      const data = localStorage.getItem('filteredByName');
      
       setMyBook(JSON.parse(data));
      
      
   }, [])

   useEffect(() => {
  const name = localStorage.getItem('name');
  if (name && myBook.length === 0) {
    const filterByName = books.filter(item => item.author.name === name);
    setMyBook(filterByName);
    localStorage.setItem('filteredByName', JSON.stringify(filterByName));
  }
}, [books, myBook]);

  // delete book
    const deleteBook = async (id) => {
       await axiosInstance.delete(`http://localhost:4000/api/books/del/${id}`);
      setBooks(books.filter(item => item._id !== id));
      
    }

    // update book
    
    const updateBook = (id) => {
      navigate(`/books/${id}/update`)
    }

    
  return (
    <div className='flex flex-col'>
      <h1 className='text-4xl font-bold p-12'>ჩემი წიგნები</h1>
      <div className='flex items-center gap-12 p-12'>
      {myBook.length === 0 ? <p className='text-2xl'>თქვენ არ გაქვთ წიგნები</p> : (myBook.map((value) => (
        <div className='flex flex-col gap-4' key={value._id}>
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
