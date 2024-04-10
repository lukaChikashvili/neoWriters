import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { BookContext } from '../context/bookContext';
import axiosInstance from './axios';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';



const Home = () => {
  // register input states
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [proffesion, setProffesion] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');

// register err
const [registerErr, setRegisterErr] = useState(false);

// sucessful register 
const [success, setSuccess] = useState(false);

const  { showPassword, handleShowPassword, handleMouseDownPassword, 
  responsiveModal, setResponsiveModal, err, nameErr,  passErr, 
  incorrect , isDarkMode} = useContext(BookContext);

  let navigate = useNavigate();

  // register users
  const handleRegister = async (e) => {
    e.preventDefault();

    if(!name || !surname || !email || !password || !location || !proffesion) {
     setRegisterErr(true);
    }else {
      try {
        await axiosInstance.post(`https://neowriters.onrender.com/api/register`, {
         name, surname, email, password, location, proffesion, image
       });
        setSuccess(true);
     } catch (error) {
       setRegisterErr(true);
     }
       
    }
    
    

  }

  const naviLogin = () => {
    navigate('/login');
    setResponsiveModal(false);
  }


  return (
  
    <div className='flex items-center justify-around h-screen  ' style = {{color: isDarkMode && '#fff'}}>

      {responsiveModal && <div className='absolute bg-black text-white z-10 opacity-80 w-full h-screen flex flex-col items-center justify-center gap-8 lg:hidden'>
    <h2 className='text-2xl'>შედით სისტემაში</h2>
     <Button variant='contained' color = "success" className='w-56 'onClick={naviLogin}>შესვლა</Button>
    
  </div>}

       <div>
         <img src = {logo} className='hidden md:block'/>
       </div>
 
 <div className='w-4/5 m-auto md:m-0 md:w-1/3'>
 <form className='w-full flex flex-col gap-6' onSubmit={handleRegister}>
   <h1 className='text-4xl font-bold text-center'>რეგისტრაცია</h1>
 <TextField error = {registerErr && !name}  label = "სახელი" variant='outlined' size="small" onChange={(e) => setName(e.target.value)} InputLabelProps={{
          style: { color: isDarkMode &&  '#fff' }, 
   }} sx = {{input: {color: isDarkMode && "#fff"}}}  style = {{ border: isDarkMode && '1px solid white', borderRadius: isDarkMode && '4px'}} />
 <TextField error = {registerErr && !surname} label = "გვარი" variant='outlined' size='small' onChange={(e) => setSurname(e.target.value)}  InputLabelProps={{
          style: { color: isDarkMode &&  '#fff' }, 
   }} sx = {{input: {color: isDarkMode && "#fff"}}}  style = {{ border: isDarkMode && '1px solid white', borderRadius: isDarkMode && '4px'}}/>
 <TextField error = {registerErr && !email} label = "ელ-ფოსტა" variant='outlined' size='small' type='email' onChange={(e) => setEmail(e.target.value)} InputLabelProps={{
          style: { color: isDarkMode &&  '#fff' }, 
   }} sx = {{input: {color: isDarkMode && "#fff"}}}  style = {{ border: isDarkMode && '1px solid white', borderRadius: isDarkMode && '4px'}}/>
 <TextField error = {registerErr && !location} label = "ქალაქი" variant='outlined' size='small' onChange={(e) => setLocation(e.target.value)} InputLabelProps={{
          style: { color: isDarkMode &&  '#fff' }, 
   }} sx = {{input: {color: isDarkMode && "#fff"}}}  style = {{ border: isDarkMode && '1px solid white', borderRadius: isDarkMode && '4px'}}/>
 <TextField error = {registerErr && !proffesion} label = "პროფესია" variant='outlined' size="small" onChange={(e) => setProffesion(e.target.value)} InputLabelProps={{
          style: { color: isDarkMode &&  '#fff' }, 
   }} sx = {{input: {color: isDarkMode && "#fff"}}}  style = {{ border: isDarkMode && '1px solid white', borderRadius: isDarkMode && '4px'}} />
 <TextField error = {registerErr && !password} label = "პაროლი" variant='outlined' size='small' type = {showPassword ? "text" : "password"}  InputProps={{
    endAdornment: (
      <InputAdornment position='end'>
         <IconButton onClick={handleShowPassword} onMouseDown={handleMouseDownPassword} edge = "end">
           {showPassword ? <VisibilityOff sx={{fontSize: 20, color: isDarkMode && "#fff"}} /> : <Visibility sx={{fontSize: 20, color: isDarkMode && "#fff"}} />}
         </IconButton>
      </InputAdornment>
    )
 }}        onChange={(e) => setPassword(e.target.value)} InputLabelProps={{
  style: { color: isDarkMode &&  '#fff' }, 
}} sx = {{input: {color: isDarkMode && "#fff"}}}  style = {{ border: isDarkMode && '1px solid white', borderRadius: isDarkMode && '4px'}} />
 




 <Button variant='contained' color = "success" type='submit'>რეგისტრაცია</Button>
  {success && <p className='text-4xl font-bold'>sucesss</p>}
 </form>

   
</div>


   
    </div>
  )
}

export default Home
