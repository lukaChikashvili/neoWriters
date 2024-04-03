import React, { useEffect, useState } from 'react'
import axiosInstance from './axios';
import profile from '../assets/profile.png';


const MyProfile = () => {
    const [users, setUsers] = useState([]);

    // images
    const [image, setImage] = useState([]);

    const [selectedFile, setSelectedFile] = useState(null);

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
        const fetchImages = async () => {
           try {
              const response = await axiosInstance.get('http://localhost:4000/api/users/profileImage');
              setImage(response.data);
              console.log(image);
           } catch (error) {
             console.log(error);
           }
        }

        fetchImages();
    }, [image]);


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

            console.log("Image uploaded successfully!");
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

  return (
    <div className='flex p-12 items-center' >
        <div className='flex flex-col gap-4 items-center shadow-lg p-12 rounded-md'>
        <h1 className='text-4xl font-bold'>ჩემი პროფილი</h1>

        <div>
            
        {image.length > 0 && (
        <>
            <p>{image[image.length - 1].name}</p>
            <img src={image[image.length - 1].dataURL} alt={image[image.length - 1].name} />
        </>
    )}
   
   <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>



 
     <h2 className='text-2xl'><span className='text-green-600'>სახელი: </span>{users.name}</h2>
     <h2 className='text-2xl'><span className='text-green-600'>გვარი: </span>{users.surname}</h2>
     <h2 className='text-2xl'><span className='text-green-600'>ელ-ფოსტა: </span>{users.email}</h2>
     <h2 className='text-2xl'><span className='text-green-600'>ქალაქი: </span>{users.location}</h2>

     <h2 className='text-2xl'><span className='text-green-600'>პროფესია: </span>{users.proffesion}</h2>
     </div>

     <div>
        
     </div>
     </div>
  

   
   
  )
}

export default MyProfile
