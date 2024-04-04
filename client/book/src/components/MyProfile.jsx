import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from './axios';
import profile from '../assets/profile.png';
import EditIcon from '@mui/icons-material/Edit';
import UploadModal from './UploadModal';
import { BookContext } from '../context/bookContext';


const MyProfile = () => {
    const [users, setUsers] = useState([]);

    // images
    const {  image, setImage, uploadModal, setUploadModal, fetchImages } = useContext(BookContext);


  



    useEffect(() => {
        const fetchUsers = async () => {
            try {
              
                const response = await axiosInstance.get('http://localhost:4000/api/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                
                
                setUsers(response.data.user);
            
               
            } catch (error) {
             
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [image]);


useEffect(() => {
    if (users && users._id) { 
        fetchImages(users._id); 
    }
}, [image]);



    
  return (
    <div className='flex p-12 items-center relative' >
        <div className='flex flex-col gap-4 items-center shadow-lg p-12 rounded-md'>
        <h1 className='text-4xl font-bold'>ჩემი პროფილი</h1>

        <div className='flex flex-cols items-center'>
            
        {image.length > 0 && (
        <>
         <div className='flex items-center gap-6'>
            <img src={image[image.length - 1].dataURL}  className='w-56 h-56 rounded-full'/>
            <EditIcon onClick = {() => setUploadModal(true)} />
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
     </div>
  

   
   
  )
}

export default MyProfile
