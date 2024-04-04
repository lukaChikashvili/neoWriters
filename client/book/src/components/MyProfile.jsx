import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from './axios';
import profile from '../assets/profile.png';
import EditIcon from '@mui/icons-material/Edit';
import UploadModal from './UploadModal';
import { BookContext } from '../context/bookContext';
import { IconButton, Tooltip } from '@mui/material';



const MyProfile = () => {
    const [users, setUsers] = useState([]);

    // images
    const {  image, setImage, uploadModal, setUploadModal, fetchImages } = useContext(BookContext);


  



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:4000/api/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsers(response.data.user);
                if (response.data.user && response.data.user._id) {
                    fetchImages(response.data.user._id);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [image]);


    
  return (
    <div className='flex p-12 items-center relative' >
        <div className='flex flex-col gap-4 items-center shadow-lg p-12 rounded-md'>
        <h1 className='text-4xl font-bold'>ჩემი პროფილი</h1>

        <div className='flex flex-cols items-center'>
            
        {image.length > 0 && (
        <>
         <div className='flex items-center gap-6'>
            <img src={image[image.length - 1].dataURL}  className='w-56 h-56 rounded-full '/>
            <Tooltip title = "რედაქტირება">
                <IconButton>
                <EditIcon onClick = {() => setUploadModal(true)}  />
                </IconButton>
            </Tooltip>
           
            </div>
        </>
    )}
   
   {uploadModal && (
    <UploadModal closeModal={() => setUploadModal(false)} />
   )}
         

            
        </div>



 
     <h2 className='text-xl'><span className='text-green-600'>სახელი: </span>{users?.name}</h2>
     <h2 className='text-xl'><span className='text-green-600'>გვარი: </span>{users?.surname}</h2>
     <h2 className='text-xl'><span className='text-green-600'>ელ-ფოსტა: </span>{users?.email}</h2>
     <h2 className='text-xl'><span className='text-green-600'>ქალაქი: </span>{users?.location}</h2>
     <h2 className='text-xl'><span className='text-green-600'>პროფესია: </span>{users?.proffesion}</h2>
     </div>

 <div>
   
 </div>

     <div>
        
     </div>
     </div>
  

   
   
  )
}

export default MyProfile
