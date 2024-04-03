import React, { useEffect, useState } from 'react'
import axiosInstance from './axios';

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

               
                setUsers(response.data.users);
            } catch (error) {
             
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
    console.log(users);
    }, [])

  return (
    <div>
    {users && users.map((user) => (
                <p key={user._id}>{user.name}</p>
            ))}
    </div>
  )
}

export default MyProfile
