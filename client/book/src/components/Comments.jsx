import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from './axios';

const Comments = () => {

    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);

    let { id } = useParams();

    const writeComment = async () => {
        const token = localStorage.getItem("token");
    const response = await axiosInstance.post(`http://localhost:4000/api/books/${id}/comment`, {text: comment}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    } 
    );
     
    setAllComments([...allComments, response.data]);
    setComment('');
    console.log(allComments);
    }


  return (
    <div>

      <TextField size = "small" onChange={(e) => setComment(e.target.value)}/>
      <Button onClick={writeComment}>გამოქვეყნება</Button>
    </div>
  )
}

export default Comments
