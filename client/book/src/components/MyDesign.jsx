import React, { useContext, useEffect } from 'react'
import { BookContext } from '../context/bookContext';
import { useNavigate } from 'react-router-dom';
import {Button} from '@mui/material';


const MyDesign = () => {
 // take myBook array from context
    const { myBookCover, setUseUrl, setSelectedItemUrl , setMyBookCover } = useContext(BookContext);
    let navigate = useNavigate();

    const publishCover = (id) => {
      setUseUrl(true);
      navigate('/create');
  
     
      const filtered = myBookCover.filter(item => item.id === id);
      const urls = filtered.map(item => item.url);
     
      setSelectedItemUrl(urls.join());

    }


  const deleteCover = (id) => {
    const filtered = myBookCover.filter(item => item.id !== id);
    
     setMyBookCover(filtered);

     localStorage.setItem('myBookCover', JSON.stringify(filtered));

    
  }



 
  return (
    <div className='flex flex-col md:-row flex-wrap' >
      {myBookCover.map((value) => (
        <div className='flex items-center flex-col '>
        <img src = {value.url} key = {value.id} className='w-96 h-96 p-12 object-cover'/>
        <div className='flex items-center gap-8'>
        <Button variant = "outlined" color = "success" onClick={() => publishCover(value.id)} >გამოყენება</Button>
        <Button variant = "contained" color = "error" onClick={() => deleteCover(value.id)}>წაშლა</Button>
        </div>
        </div>
      ))}
    </div>
  )
}

export default MyDesign
