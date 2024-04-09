import { Button, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from './axios';
import { BookContext } from '../context/bookContext';

const Comments = () => {

    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);

    let { id } = useParams();
    const { isDarkMode } = useContext(BookContext);

    const writeComment = async () => {
        const token = localStorage.getItem("token");
    const response = await axiosInstance.post(`http://localhost:4000/api/books/${id}/comment`, {text: comment}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    } 
    );
    setComment('');
    setAllComments([...allComments, response.data]);

  
    }

    const getAll = async () => {
        const response = await axiosInstance.get(`http://localhost:4000/api/books/${id}/comment/all`);

        setAllComments(response.data.getComment);
        
    }

    useEffect(() => {
        getAll();
     }, [comment]);


     // delete comment
 const handleDelete =async (id) => {
    await axiosInstance.delete(`http://localhost:4000/api/books/${id}/comment/del`);

    getAll();
 }
 
  return (
    <div>
   <div className='flex items-center gap-8'>
      <TextField size = "small" label = "დაწერეთ კომენტარი..." value = {comment} className = "w-96" onChange={(e) => setComment(e.target.value)}  InputLabelProps={{
          style: { color: isDarkMode &&  '#fff' }, 
   }} style = {{ border: isDarkMode && '1px solid white', borderRadius: isDarkMode && '4px'}}  sx = {{input: {color: isDarkMode && "#fff"}}}/>
      <Button onClick={writeComment} variant='contained' color = "success">გამოქვეყნება</Button>
      </div>
      {Array.isArray(allComments) ? (
  allComments.map((value) => (
    <div className='pt-6'>
    <p key={value._id} className='rounded-md bg-gray-400 p-8 shadow-gray-600 shadow-lg'>{value.text}</p>
{value.user === localStorage.getItem('name') &&  (
  <div>
     <Button>რედაქტირება</Button>
       <Button onClick={() => handleDelete(value._id)}>წაშლა</Button>
    </div>
)}
       
    </div>
  ))
) : (
  <p>No comments available</p>
)}
    </div>
  )
}

export default Comments
