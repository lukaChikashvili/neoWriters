import React, { useEffect, useState } from 'react'
import axiosInstance from './axios';
import profile from '../assets/profile.png';


const MyProfile = () => {
    const [users, setUsers] = useState([]);

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
    }, []);

    useEffect(() => {
    console.log(users);
    }, [users])

  return (
    <div className='flex p-12 items-center' >
        <div className='flex flex-col gap-4 items-center shadow-lg p-12 rounded-md'>
        <h1 className='text-4xl font-bold'>ჩემი პროფილი</h1>

        <div>
             <img src = {profile} className='w-36'/>
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
