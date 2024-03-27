import React, { useContext, useEffect } from 'react'
import { BookContext } from "../context/bookContext";
import axiosInstance from './axios';
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
    <div className='flex'>
       {books.map((value) => (
        <div key={value._id}>
          <p>{value.title}</p>
           <img src = {value.url} />
      
        
         </div>
       ))}
    </div>
  )
}

export default Profile
