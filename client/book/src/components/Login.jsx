import React, { useContext, useState } from 'react'
import { BookContext } from '../context/bookContext';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axios';

const Login = () => {

    const {  err, setErr,   showPassword,
        handleShowPassword, handleMouseDownPassword,  
         nameErr,setNameErr, setPassErr, setIncorrect,  passErr, 
          incorrect, isDarkMode } = useContext(BookContext);
          let navigate = useNavigate();

          const [name, setName] = useState('');
          const [password, setPassword] = useState('');
          

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
            
  return (
    <div className='flex flex-col items-center justify-center h-screen pt-12 gap-6  p-12' style={{color: isDarkMode && '#fff'}}>
        <h1 className='text-3xl font-semibold text-center'>შესვლა</h1>
       <TextField error = {err && true} helperText = {err ?  'შეიყვანეთ სახელი' : nameErr ? "შეიყვანეთ სახელი" : incorrect ? "სახელი არასწორია" : ''}  label = "სახელი" variant='outlined' size="small" className='w-44' onChange={(e) => setName(e.target.value)} required  InputLabelProps={{
          style: { color: isDarkMode &&  '#fff' }, 
   }} sx = {{input: {color: isDarkMode && "#fff"}}}  style = {{ border: isDarkMode && '1px solid white', borderRadius: isDarkMode && '4px'}}/>
         
         <TextField error = {err && true} helperText = {err ? 'შეიყვანეთ პაროლი' : passErr ? "შეიყვანეთ პაროლი" : incorrect ? "პაროლი არასწორია" : ''} label = "პაროლი" variant='outlined' size='small' type = {showPassword ? "text" : "password"}   InputProps={{ 
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff sx={{fontSize: 20, color: isDarkMode && "#fff"}} /> : <Visibility sx={{fontSize: 20, color: isDarkMode && "#fff"}}/>}
        </IconButton>
      </InputAdornment>
    )
  }} className='w-44' onChange={(e) => setPassword(e.target.value)} required InputLabelProps={{
    style: { color: isDarkMode &&  '#fff' }, 
}} sx = {{input: {color: isDarkMode && "#fff"}}}  style = {{ border: isDarkMode && '1px solid white', borderRadius: isDarkMode && '4px'}} />

<Button variant='contained' color="success" onClick={handleLogin}>შესვლა</Button>
    </div>
  )
}

export default Login
