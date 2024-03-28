import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import FormatBoldIcon from '@mui/icons-material/FormatBold';

const Design = () => {
  // colors
  const colors = [
    {
      id: 1,
      name: 'red'
    },

    {
      id: 2,
      name: 'green'
    },

    {
      id: 3,
      name: 'blue'
    },

    {
      id: 4,
      name: 'orange'
    },

    {
      id: 5,
      name: 'purple'
    },

    {
      id: 6,
      name: 'yellow'
    },

    {
      id: 7,
      name: 'lime'
    },

    {
      id: 8,
      name: 'gray'
    },

    {
      id: 9,
      name: 'black'
    },

    {
      id: 10,
      name: 'skyblue'
    },

    {
      id: 11,
      name: 'salmon'
    },

    {
      id: 12,
      name: 'orange'
    },

    {
      id: 13,
      name: 'brown'
    },

    {
      id: 14,
      name: 'white'
    }



  ];

  const [selectedColor, setSelectedColor] = useState(null);
  const [titleChange, setTitleChange] = useState('');
const [size, setSize] = useState(16);
const [settings, setSettings] = useState(false);
const [center, setCenter] = useState(false);
const [right, setRight] = useState(false);
const [left, setLeft] = useState(false);
const [yPosition, setYposition] = useState(0);
const [textColor, setTextColor] = useState('');
const [bold, setBold] = useState(false);
const [textBackground, setTextBackground] = useState('');
const [author, setAuthor] = useState('');
const [authorSize, setAuthorSize] = useState(16);
const [authorSettings, setAuthorSettings] = useState(false);
const [authorCentered, setAuthorCenter] = useState(false);
const [authorRighted, setAuthorRight] = useState(false);
const [authorLefted, setAuthorLeft] = useState(false);
const [authorYPosition, setAuthorYPosition] = useState(0);
const [image, setImage] = useState('');

  // change background function
  const changeBackground = (name) => {
    setSelectedColor(name);
  }


  const handleLeft = () => {
    setLeft(true);
    setCenter(false);
    setRight(false);
  };
  
  const handleRight = () => {
    setLeft(false);
    setCenter(false);
    setRight(true);
  };

  const handleCenter = () => {
    setLeft(false);
    setCenter(true);
    setRight(false);
  };

  const authorLeft = () => {
    setAuthorLeft(true);
    setAuthorCenter(false);
    setAuthorRight(false);
  };
  
  const authorRight = () => {
    setAuthorLeft(false);
    setAuthorCenter(false);
    setAuthorRight(true);
  };

  const authorCenter = () => {
    setAuthorLeft(false);
    setAuthorCenter(true);
    setAuthorRight(false);
  };

  const toggleBold = () => {
    setBold(prev => !prev);
  };

  const changeBackgroundImage = (url) => {
    setImage(`url(${url})`);
  }

  return (
    <div className='flex items-center justify-between h-screen pr-4 '>
      
      <div className='bg-gray-300 w-1/4 h-screen p-8 flex flex-col gap-4 '>
        <div className='flex items-center gap-8'>
        <h1 className='text-xl '> სათაური: </h1>
        <TextField size='small' label = "სათაური..." className='w-56' onChange={(e) => setTitleChange(e.target.value)} />

        </div>

        <div className='flex items-center gap-4'>
          <TextFormatIcon />
          <p>ტექსტის ზომა: </p>
          <TextField size='small' type='number' value = {size} onChange={(e) => setSize(e.target.value)} className='w-24'/>
        </div>

        <div className='flex items-center gap-4'>
          <ColorLensIcon />
          <p>ტექსტის ფერი: </p>
          <TextField size='small' type='text' value = {textColor} onChange={(e) => setTextColor(e.target.value)} className='w-24'/>
          <FormatBoldIcon className='cursor-pointer' onClick = {toggleBold} />
        </div>

        <div className='flex items-center gap-10'>
        <h1 className='text-xl '> ავტორი: </h1>
        <TextField size='small' label = "ავტორი..." className='w-56' onChange={(e) => setAuthor(e.target.value)} />
        </div>

        <div className='flex items-center gap-4'>
          <TextFormatIcon />
          <p>ტექსტის ზომა: </p>
          <TextField size='small' type='number' value = {authorSize} onChange={(e) => setAuthorSize(e.target.value)} className='w-24'/>
        </div>

        <div className='flex items-center gap-4'>
          <ColorLensIcon />
          <p>ტექსტის ფერი: </p>
          <TextField size='small' type='text' value = {textColor} onChange={(e) => setTextColor(e.target.value)} className='w-24'/>
          <FormatBoldIcon className='cursor-pointer' onClick = {toggleBold} />
        </div>

        <div>
          <h1  className='text-xl pb-4 '>აირჩიეთ ფერი:</h1>
        
        {colors.map((value) => (
          <div className='inline-flex gap-4 mr-2' key={value.id}>
           <div style={{backgroundColor: value.name}} className='w-8 h-8 rounded-md shadow cursor-pointer' onClick={() => changeBackground(value.name)}></div>
           </div>
        ))}
        </div>

        <div>
          <h2>ფონის სურათი:</h2>
          <TextField size='small' label = "ჩაწერეთ ლინკი" onChange={(e) => changeBackgroundImage(e.target.value)}/>
        </div>
      </div>
  
      <div className='w-1/2 h-4/5 -mt-16 bg-white shadow-lg rounded-md' style={{backgroundColor: selectedColor, backgroundImage: image, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', objectFit: 'cover'}}>
      <h1 className='cursor-pointer' style={{fontSize: size + 'px', textAlign: center ? "center" : right ? "end" : left ? "start" : null, marginTop: yPosition + "px", color: textColor, fontWeight: bold ?  "bold" : null, backgroundColor: textBackground}} onClick={() => setSettings(true)} >{titleChange}</h1>
      {settings && (
        <div className='flex items-center gap-4 bg-gray-200 relative p-4'>
            <span onClick={() => setSettings(false)} className='absolute right-2 cursor-pointer'>X</span>
          <Button color = "success" onClick={handleLeft}>მარცხნივ</Button>
          <Button  color = "success" onClick={handleCenter} >ცენტრში</Button>
          <Button color = "success" onClick={handleRight}>მარჯვნივ</Button>
          <span>y:</span><TextField size = "small" type = "number" className='w-24' value = {yPosition} onChange={(e) => setYposition(e.target.value)} />
          <span>ტექსტის ფონი: </span><TextField size = "small" type = "text" className='w-24' onChange={(e) => setTextBackground(e.target.value)}  />
          </div>
      )}
     <h2 style={{fontSize: authorSize + "px", textAlign: authorCentered ? "center" : authorRighted ? "end" : authorLefted ? "start" : null, marginTop: authorYPosition + "px" }} className='cursor-pointer' onClick={() => setAuthorSettings(true)}>{author}</h2>

     {authorSettings && (
       <div className='flex items-center gap-4 bg-gray-200 relative p-4'>
            <span onClick={() => setAuthorSettings(false)} className='absolute right-2 cursor-pointer'>X</span>
            <Button color = "success" onClick={authorLeft}>მარცხნივ</Button>
          <Button  color = "success" onClick={authorCenter} >ცენტრში</Button>
          <Button color = "success" onClick={authorRight}>მარჯვნივ</Button>
          <span>y:</span><TextField size = "small" type = "number" className='w-24' value = {authorYPosition} onChange={(e) => setAuthorYPosition(e.target.value)} />
        </div>
     )}
</div>

<div>
  sidebar
</div>
  

    </div>
  )
}

export default Design
