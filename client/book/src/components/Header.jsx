import React, { useContext, useState } from 'react'
import {Button,   TextField} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import {Link, useNavigate} from 'react-router-dom';
import axiosInstance from './axios';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';
import { BookContext } from '../context/bookContext';
import BrushIcon from '@mui/icons-material/Brush';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Header = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  
  
  // cart span
  const { cart, err, setErr} = useContext(BookContext);
   const isUserLoggedIn = localStorage.getItem('token');

   // logout modal
   const [modal, setModal] = useState(false);  

   // errors
   const [nameErr, setNameErr] = useState(false);
   const [passErr, setPassErr] = useState(false);
   // incorrect credential error
   const [incorrect, setIncorrect] = useState(false);

  let navigate = useNavigate();

const handleLogin = async () => {
  
if(!name && !password) {
  setErr(true);
  setNameErr(false);
}else if(!name) {
  setNameErr(true);
  setPassErr(false);
   
}else if(!password) {
   setPassErr(true);
   setNameErr(false);
}else {
  try {
    const response = await axiosInstance.post('http://localhost:4000/api/login', {name, password});
  const token = response.data.token;
  localStorage.setItem('token', token);
  localStorage.setItem('name', response.data.name);

  navigate('/profile');
  } catch (error) {
   setIncorrect(true);
  }
  
    
}
 

}


const logout = () => {
  localStorage.removeItem('token');
 
  navigate('/');
}

  return (
    <div className='w-full flex items-center justify-between px-12 py-6 shadow'>
      <div className="logo">
        <h1 className='text-3xl font-bold cursor-pointer' onClick={() => navigate('/profile')}>მწერალი</h1>
      </div>
       {isUserLoggedIn ? (
        <div className='flex items-center gap-8 '>
       <Button variant='outlined' color = "success"> <Link to = "/create" className='text-md'>წიგნის დაწერა</Link></Button>
        <p className='text-2xl font-semibold'>{localStorage.getItem('name')}</p>
        <p>ბალანსი: 500 ლ</p>
        <ShoppingCartIcon className='cursor-pointer relative' onClick = {() => navigate('/cart')} /><span className='absolute top-6 right-24 text-white text-sm text-center bg-green-800 rounded-full w-4 h-4'>{cart}</span>
       {modal ? <CloseIcon className='cursor-pointer' onClick = {() => setModal(false)} /> :   <DragHandleIcon className='cursor-pointer' onClick = {() => setModal(true)} />}
<AnimatePresence>
         {
         
          modal && <motion.div initial = {{opacity: 0, translateX: 50}} animate = {{opacity: 1, translateX: 0}} transition = {{duration: 1, delay: 0.2, type: 'spring'}} exit = {{translateX: 300}} className='absolute right-0 top-24  bottom-0 h-full w-64 bg-gray-300 -mt-2 flex flex-col gap-4'>
            <Link className='p-4 flex gap-4' to = "/design" onClick={() => setModal(false)}><BrushIcon className='text-green-800' />ყდის დიზაინის შექმნა</Link>
            <Link className='p-4 flex gap-4' to = "/myDesign"  onClick={() => setModal(false)}><InsertPhotoIcon className='text-green-800'/>ჩემი სურათები</Link>
            <Link className='p-4 flex gap-4' to = "/myBooks"  onClick={() => setModal(false)}><MenuBookIcon className='text-green-800'/>ჩემი წიგნები</Link>
          <Button variant='contained' color="success" onClick={logout} className='w-full'>გასვლა</Button>

          </motion.div>
  
         }
         </AnimatePresence>
         </div>
       ) : (
        <form className='flex items-center gap-4'>
         <TextField error = {err && true} helperText = {err ?  'შეიყვანეთ სახელი' : nameErr ? "შეიყვანეთ სახელი" : incorrect ? "სახელი არასწორია" : ''}  label = "სახელი" variant='outlined' size="small" className='w-44' onChange={(e) => setName(e.target.value)} required />
         
         <TextField error = {err && true} helperText = {err ? 'შეიყვანეთ პაროლი' : passErr ? "შეიყვანეთ პაროლი" : incorrect ? "პაროლი არასწორია" : ''} label = "პაროლი" variant='outlined' size='small' type = "password" className='w-44' onChange={(e) => setPassword(e.target.value)} required />
         <Button variant='contained' color="success" onClick={handleLogin}>შესვლა</Button>
        
     </form>
  
       )}
        
    </div>
  )
}

export default Header
