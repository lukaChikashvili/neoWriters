import React, { useContext, useEffect } from 'react'
import { BookContext } from "../context/bookContext";
import axiosInstance from './axios';
import lari from '../assets/lari.png';
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

  return (
    <div className='flex items-center gap-12 p-12'>
       {books.map((value) => (
        <div key={value._id}>
          <p className='text-center text-xl font-semibold pb-6'>{value.title}</p>
           <img src = {value.url} className='shadow-lg rounded-md cursor-pointer' />
           <p className='flex items-center text-2xl pt-6 '>{value.price}<img src = {lari} className='w-8' /></p>
      
        
         </div>
       ))}
    </div>
  )
}

export default Profile
