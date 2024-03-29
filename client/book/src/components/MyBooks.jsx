import React, { useContext, useEffect, useState } from 'react'
import { BookContext } from '../context/bookContext';


const MyBooks = () => {
    const { books } = useContext(BookContext);
    const [myBook, setMyBook] = useState([]);

    useEffect(() => {
      const name = localStorage.getItem('name');
      if(name) {
        const filterByName = books.filter(item => item.author.name === name);

        setMyBook(filterByName);
        localStorage.setItem('filteredByName', JSON.stringify(filterByName));
      }
       
 
    }, [books]);

    
  return (
    <div className='flex flex-col'>
      <h1 className='text-4xl font-bold p-12'>ჩემი წიგნები</h1>
      <div className='flex items-center gap-12 p-12'>
      {myBook.map((value) => (
        
        <img src = {value.url} className='w-56' />
       
      ))}
       </div>
    </div>
  )
}

export default MyBooks
