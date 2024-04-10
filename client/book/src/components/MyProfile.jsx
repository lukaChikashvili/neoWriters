import React, { useContext, useEffect, useRef, useState } from 'react'
import axiosInstance from './axios';
import profile from '../assets/profile.png';
import EditIcon from '@mui/icons-material/Edit';
import UploadModal from './UploadModal';
import { BookContext } from '../context/bookContext';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';



const MyProfile = () => {


    // images
    const {  image, setImage, uploadModal, setUploadModal, fetchImages, isDarkMode , fetchUserData, users} = useContext(BookContext);


  // update profile
  const [updateModal, setUpdateModal] = useState(false);

  // update input states
  const [newName, setNewName] = useState('');
  const [newSurname, setNewSurname] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newProffesion, setNewProffesion] = useState('');


    useEffect(() => {
     
        

        fetchUserData();
    }, [image]);


    // update profile
    const handleProfileUpdate = async () => {
      try {
        const updatedObj = {};

        if(newName) updatedObj.name = newName;
        if(newSurname) updatedObj.surname = newSurname;
        if(newEmail) updatedObj.email = newEmail;
        if(newLocation) updatedObj.location = newLocation;
        if(newProffesion) updatedObj.proffesion = newProffesion;

        await axiosInstance.put(`http://localhost:4000/api/users/${users._id}`, updatedObj);

         setUpdateModal(false);
        
      } catch (error) {
        console.log(error);
      }
    }

    let modalRef = useRef(null);

    // detect outside click
    useEffect(() => {
        const detectClick = (e) => {
            if ( modalRef.current && !modalRef.current.contains(e.target)) {
                  setUpdateModal(false);
                  setUploadModal(false);
            }
        };
    
        document.addEventListener('mousedown', detectClick);
    
        return () => {
            document.removeEventListener('mousedown', detectClick);
        };
    }, [modalRef]);

    let bookByName = localStorage.getItem('filteredByName');
    bookByName = bookByName ? JSON.parse(bookByName) : [];

  return (
    <div className='flex p-12 items-center relative justify-between gap-12' >
        <div className='flex flex-col gap-4 items-center shadow-lg p-12 rounded-md'>
        <h1 className='text-4xl font-bold' style = {{color: isDarkMode && '#fff'}}>ჩემი პროფილი</h1>

        <div className='flex flex-cols items-center'>
            
       
        <>
         <div className='flex items-center gap-6'>
          <img src={image.length > 0 ? image[image.length - 1].dataURL : profile}  className='w-56 h-56 rounded-full object-cover '/>
            
            <Tooltip title = "რედაქტირება">
                <IconButton>
                <EditIcon onClick = {() => setUploadModal(true)} sx = {{color: isDarkMode && '#fff'}} />
                </IconButton>
            </Tooltip>
           
            </div>
        </>
   
   
   {uploadModal && (
    <UploadModal closeModal={() => setUploadModal(false)} UploadModalRef={modalRef} />
   )}
         

            
        </div>



 <div className='flex items-center gap-4' >
     <h2 className='text-xl' style = {{color: isDarkMode && '#fff'}}><span className='text-green-600'>სახელი: </span>{users?.name}</h2>
     <Tooltip title = "რედაქტირება">
                <IconButton>
                <EditIcon onClick = {() => setUpdateModal(true)} sx = {{color: isDarkMode && '#fff'}}  />
                </IconButton>
            </Tooltip>
            </div>   
     <h2 className='text-xl' style = {{color: isDarkMode && '#fff'}}><span className='text-green-600' >გვარი: </span>{users?.surname}</h2>
     <h2 className='text-xl' style = {{color: isDarkMode && '#fff'}}><span className='text-green-600'>ელ-ფოსტა: </span>{users?.email}</h2>
     <h2 className='text-xl' style = {{color: isDarkMode && '#fff'}}><span className='text-green-600'>ქალაქი: </span>{users?.location}</h2>
     <h2 className='text-xl' style = {{color: isDarkMode && '#fff'}}><span className='text-green-600'>პროფესია: </span>{users?.proffesion}</h2>
     </div>

 <div>
    {updateModal && <div className='bg-white absolute w-1/2 h-3/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-md p-8 ' ref= {modalRef}>
        <h1 className='text-3xl font-semibold text-center pb-4' >რედაქტირება</h1>
        <span className='absolute top-4 right-4 text-2xl cursor-pointer' onClick={() => setUpdateModal(false)}>X</span>
        <form className='flex flex-col gap-4'>
        <TextField size = "small" label = "სახელი" value = {newName} onChange={(e) => setNewName(e.target.value)}/>
        <TextField size = "small" label = "გვარი" value = {newSurname} onChange={(e) => setNewSurname(e.target.value)}/>
        <TextField size = "small" label = "ელ-ფოსტა" value = {newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
        <TextField size = "small" label = "ქალაქი" value = {newLocation} onChange={(e) => setNewLocation(e.target.value)}/>
        <TextField size = "small" label = "პროფესია" value = {newProffesion}  onChange={(e) => setNewProffesion(e.target.value)}/>
      <Button variant='contained' color ="success" onClick={handleProfileUpdate}>რედაქტირება</Button>
      </form>
        </div>}
 </div>

     <div className='w-4/5 ' style={{color: isDarkMode && '#fff'}}>
         <h2 className='text-3xl font-semibold'>ჩემი წიგნები</h2>

 {bookByName.map((value) => (
 <div className='inline-flex flex-col items-center gap-4 p-4 flex-wrap'>
    <p className='text-xl font-semibold'>{value.title}</p>
    <img src = {value.url} className='w-56 h-56 rounded-md shadow object-cover'/>
    </div>
 ))}
        
     </div>
     </div>
  

   
   
  )
}

export default MyProfile
