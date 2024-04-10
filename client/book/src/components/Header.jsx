import React, { useContext, useEffect, useRef, useState } from 'react'
import {Button,   IconButton,   InputAdornment,   TextField, Tooltip} from '@mui/material';
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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeSharpIcon from '@mui/icons-material/LightModeSharp';
import profile from '../assets/profile.png';
import HomeIcon from '@mui/icons-material/Home';
import titleLogo from '../assets/titleLogo.png';
const Header = () => {
 

 
  
  // cart span
  const { cart, err, setErr, showPassword,
          handleShowPassword, handleMouseDownPassword,  
          showLari, books, image, setImage, fetchImages, 
          setResponsiveModal, nameErr, setNameErr, passErr,
           responsiveModal, setPassErr, incorrect, setIncorrect ,
          isDarkMode, toggleDarkMode, toggleLightMode, users} = useContext(BookContext);
   const isUserLoggedIn = localStorage.getItem('token');

   // logout modal
   const [modal, setModal] = useState(false);  

   
   // saerch input
   const [search, setSearch] = useState('');
   const [searchResult, setSearchResult] = useState([]);
   const [name, setName] = useState('');
   const [password, setPassword] = useState('');
   
 
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
        const response = await axiosInstance.post(`${process.env.BASE_URL}/api/login`, {name, password});
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

useEffect(() => {
   const filterSearch = books.filter(item => item.title.startsWith(search));
     
   setSearchResult(filterSearch);

}, [books, search]);


// navigate to full page
const showFull = (id) => {
  navigate(`/books/${id}`);
  setSearch(false);
  
}


useEffect(() => {
  fetchImages();
}, []);


const showModal = () => {
  setResponsiveModal(true);

  if(responsiveModal === false) {
    setResponsiveModal(true);
  }
}

// menu ref
let menuRef = useRef(null);

// close menu on outside click
useEffect(()=> {

  const detectClick = (e) => {
    if(menuRef.current && !menuRef.current.contains(e.target)){
      setModal(false);
     }
  
  }


   document.body.addEventListener('mousedown', detectClick);

   return () => {
    document.body.removeEventListener('mousedown', detectClick);
   }
}, [])
  return (
    <div className='w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-12 py-6 shadow relative' style={{color: isDarkMode && '#fff'}}>
      <div className="logo flex gap-4 md:gap-12">
        <h1 className='text-sm md:text-3xl font-bold cursor-pointer hidden md:block '  style={{color: isDarkMode ? "#fff" : 'black'}}  onClick={() => isUserLoggedIn && navigate('/profile')}><img src = {titleLogo} className='w-56'/></h1>
       {isUserLoggedIn &&  <TextField size='small' variant='outlined' label = "მოძებნე წიგნი..."  className='input' style = {{width: '500px',  border: isDarkMode && '1px solid white', borderRadius: isDarkMode && '4px'}} onChange={(e) => setSearch(e.target.value)} sx = {{input: {color: isDarkMode && "#fff"}, width: {xs: '100px'}}}  InputLabelProps={{
          style: { color: isDarkMode &&  '#fff' }, 
   }} /> }
       <div className='absolute -bottom-20 bg-gray-400 left-40 rounded-md shadow-md' style={{width: "500px", marginLeft: "7px"}}>
       {search && searchResult.map((value) => (
     
         <p  className='p-4 px-8 flex items-center justify-between gap-12 text-lg'><img src = {value.url} className='w-12' />{value.title}  <span className='font-bold'>{value.price}ლ</span> <OpenInNewIcon className='cursor-pointer'  onClick = {() => showFull(value._id)} /> </p>
   
       ))}
       </div>
      </div>
       {isUserLoggedIn ? (
        <div className='flex items-center gap-8 '>
         <Link to = "/profile" className='absolute left-12 md:hidden'><HomeIcon /></Link>
        {isDarkMode ?  <DarkModeIcon sx = {{color: "#fff", cursor: 'pointer'}} onClick = {toggleDarkMode} /> :  <LightModeSharpIcon onClick = {toggleLightMode} />}  
       <Button variant={isDarkMode ? "contained" : 'outlined'} color = "success" style={{marginLeft: '30px'}} className='flex items-center gap-4 text-md' onClick={() => navigate('/create')}><AutoStoriesIcon  /><span className='hidden md:block'>წიგნის დაწერა</span></Button>


        <Tooltip title = "ჩემი პროფილი">
          <IconButton>
          <img src = {image.length > 0 ? image[image.length - 1].dataURL : profile} onClick={() => navigate('/myProfile')} className='w-8 h-8 rounded-full object-cover hidden md:block' />
         
         </IconButton>
         </Tooltip>

      


        <p className='hidden md:block'>ბალანსი:<span> {showLari}</span></p>
        <Tooltip title = "ჩემი კალათა" >
          <IconButton>
          <ShoppingCartIcon className='cursor-pointer relative right-16 md:right-0' style={{color: isDarkMode && '#fff'}} onClick = {() => navigate('/cart')} /><span className='absolute top-0 right-16 md:right-0 text-white text-sm text-center bg-green-800 rounded-full w-4 h-4 '>{cart}</span>
          </IconButton>
        </Tooltip>
        
       {modal ? <CloseIcon className='cursor-pointer' onClick = {() => setModal(false)} /> :  ( 
       
       <Tooltip title = "მენიუ">
        <IconButton>
        <DragHandleIcon className='cursor-pointer '  onClick = {() => setModal(true)} style={{color: isDarkMode && '#fff'}} />
        </IconButton>
       </Tooltip>
     
       
       )}
<AnimatePresence>
         {
         
          modal && <motion.div initial = {{opacity: 0, translateX: 30}} animate = {{opacity: 1, translateX: 0}} 
          transition = {{duration: 1, delay: 0.2, type: 'spring'}} 
          exit = {{translateX: 300}} 
          className='absolute right-0 top-24  z-10 bottom-0 min-h-screen w-64 bg-gray-400 -mt-2 flex flex-col gap-4' ref = {menuRef}>

            <Link className='p-4 hidden md:flex gap-4' to = "/design" style={{color: isDarkMode && 'black'}} onClick={() => setModal(false)}><BrushIcon className='text-green-800' />ყდის დიზაინის შექმნა</Link>
            <Link className='p-4 hidden md:flex gap-4' to = "/myDesign" style={{color: isDarkMode && 'black'}} onClick={() => setModal(false)}><InsertPhotoIcon className='text-green-800'/>ჩემი სურათები</Link>
            <Link className='p-4 flex gap-4' to = "/myBooks" style={{color: isDarkMode && 'black'}} onClick={() => setModal(false)}><MenuBookIcon className='text-green-800'/>ჩემი წიგნები</Link>
          <Button variant='contained' color="success" onClick={logout} className='w-full'>გასვლა</Button>

          </motion.div>
  
         }
         </AnimatePresence>
         </div>
       ) : (
 <>
   
        <DragHandleIcon className=' md:hidden cursor-pointer icon' onClick = {showModal}/>
        <form className=' items-center gap-4 hidden md:flex'>
          
         <TextField error = {err && true} helperText = {err ?  'შეიყვანეთ სახელი' : nameErr ? "შეიყვანეთ სახელი" : incorrect ? "სახელი არასწორია" : ''}  label = "სახელი" variant='outlined' size="small" className='w-44' onChange={(e) => setName(e.target.value)} required style = {{ border: isDarkMode && '1px solid white', borderRadius: isDarkMode && '4px'}} sx = {{input: {color: isDarkMode && "#fff"}}}  InputLabelProps={{
          style: { color: isDarkMode &&  '#fff' }, 
   }} />
         
         <TextField error = {err && true} helperText = {err ? 'შეიყვანეთ პაროლი' : passErr ? "შეიყვანეთ პაროლი" : incorrect ? "პაროლი არასწორია" : ''} label = "პაროლი" variant='outlined' size='small' type = {showPassword ? "text" : "password"} style = {{ border: isDarkMode && '1px solid white', borderRadius: isDarkMode && '4px'}}  InputProps={{ 
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff sx={{fontSize: 20, color: isDarkMode && '#fff'}} /> : <Visibility sx={{fontSize: 20, color: isDarkMode && '#fff'}}/>}
        </IconButton>
      </InputAdornment>
    )
  }} className='w-44' onChange={(e) => setPassword(e.target.value)} required  sx = {{input: {color: isDarkMode && "#fff"}}}  InputLabelProps={{
    style: { color: isDarkMode &&  '#fff' }, 
}}/>

         <Button variant='contained' color="success" onClick={handleLogin}>შესვლა</Button>

     </form>

     </>
  
       )}
      
    </div>
  )
}

export default Header
