import React, { useContext, useState } from 'react'
import { BookContext } from '../context/bookContext';
import axiosInstance from './axios';
import { Button } from '@mui/material';

const UploadModal = ({closeModal, UploadModalRef}) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const { setImage, setUploadModal } = useContext(BookContext);
 

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            console.error("No file selected.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('testImage', selectedFile);

            await axiosInstance.post('http://localhost:4000/api/users/profileImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            setImage(selectedFile);
            setUploadModal(false);
            

            console.log("Image uploaded successfully!");
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

  return (
    <div>
        <div className=' bg-white absolute w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-md p-4' ref = {UploadModalRef}>
            <span className='absolute right-2 top-2 cursor-pointer' onClick={closeModal}>X</span>
    
            <h1 className='text-3xl font-semibold text-center'>შეცვალე ფოტო</h1>
            <div className='p-12'>
 <input type="file" onChange={handleFileChange}  />
 <Button onClick={handleUpload} variant = "contained" color = "success">ატვირთვა</Button>
 </div>
          
 
  </div>
    </div>
  )
}

export default UploadModal
