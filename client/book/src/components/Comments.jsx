import { Button, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from './axios';
import { BookContext } from '../context/bookContext';
import EditIcon from '@mui/icons-material/Edit';

const Comments = () => {

    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const [updatedText, setUpdatedText] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
 

    let { id } = useParams();
    const { isDarkMode, image } = useContext(BookContext);

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
 
 // update comment
 const handleUpdate = async (id) => {
  await axiosInstance.put(`http://localhost:4000/api/books/${id}/comment/update`, {text: updatedText});

  getAll();
  setShowInput(false);
  setShowEdit(false);
 
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
     
    <p key={value._id} className='rounded-md bg-gray-400 p-8 shadow-gray-600 shadow-lg flex items-center gap-8'><img src = {image[image.length - 1]?.dataURL} className='w-12 h-12 rounded-full object-cover'/>{showInput ?
    <div className='flex items-center gap-4'>
    <TextField size = "small" placeholder='ახალი კომენტარი..' value = {updatedText} onChange={(e) => setUpdatedText(e.target.value)}/> 
     <Button onClick={() => handleUpdate(value._id)} variant='outlined' color = "success" >გამოქვეყნება</Button>
     </div>
    : value.text} </p>
{value.user === localStorage.getItem('name') &&  (
 showEdit ? (
  <div className='pt-4 flex items-center gap-4'>
  <Button onClick={() => setShowInput(true)} variant = "contained" color = "success" className='w-36'>რედაქტირება</Button>
  <Button onClick={() => handleDelete(value._id)}  variant = "contained" color = "error" className='w-36'>წაშლა</Button>
</div>
 ) : <EditIcon sx = {{fontSize: '20px', cursor: "pointer"}} onClick = {() => setShowEdit(true)} />
 

 
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
