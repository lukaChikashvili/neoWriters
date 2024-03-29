import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, TextField } from '@mui/material';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { createFileName, useScreenshot } from 'use-react-screenshot';
import { BookContext } from '../context/bookContext';

const Design = () => {
  // take states from bookContext
  const {myBookCover, setMyBookCover} = useContext(BookContext)

// take screenshot
 const [image1, takeScreenshot] = useScreenshot({
  type: 'image/png',
  quality: 1.0
 });

 const canvasRef = useRef(null);

 // download function
 const download = (image1, {name = 'img', extension ='png', id = null} = {}) => {
   const a = document.createElement('a');
   a.href = image1;
   a.download = createFileName(extension, name);
   a.click();

   // new id
   const newId = id !== null ? id : Math.random().toString(36).substring(2, 9);

   setMyBookCover([...myBookCover, { id: newId, url: JSON.stringify(image1) }]);


 }

 // take screenshot
 const downloadScreenshot = () => {
    takeScreenshot(canvasRef.current).then(download);
 }

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
const [authorColor, setAuthorColor] = useState('');
const [deleteModal, setDeleteModal] = useState(false);

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

  useEffect(() => {
    const titlechanged = localStorage.getItem('titlechange');
    setTitleChange(JSON.parse(titlechanged));
    const size = localStorage.getItem('size');
    setSize(size);

    const textColor = localStorage.getItem('textColor');
    setTextColor(JSON.parse(textColor));

    const author = localStorage.getItem('author');
    setAuthor(JSON.parse(author));

    const authorSize = localStorage.getItem('authorSize');
    setAuthorSize(JSON.parse(authorSize));

    const bold = localStorage.getItem('bold');
    setBold(JSON.parse(bold));

    const authorColor = localStorage.getItem('authorColor');
    setAuthorColor(JSON.parse(authorColor));

    const selectedColor = localStorage.getItem('selectedColor');
    setSelectedColor(JSON.parse(selectedColor));

    const image = localStorage.getItem('image');
    setImage(JSON.parse(image));

    const center = localStorage.getItem('center');
    setCenter(JSON.parse(center));

    const left = localStorage.getItem('left');
    setLeft(JSON.parse(left));

    const right = localStorage.getItem('right');
    setRight(JSON.parse(right));

    const yPosition = localStorage.getItem('yPosition');
    setYposition(JSON.parse(yPosition));

    const textBackground = localStorage.getItem('textBackground');
    setTextBackground(JSON.parse(textBackground));

    const authorCentered = localStorage.getItem('authorCentered');
    setAuthorCenter(JSON.parse(authorCentered));

    const authorLefted = localStorage.getItem('authorLefted');
    setAuthorLeft(JSON.parse(authorLefted));

    const authorRighted = localStorage.getItem('authorRighted');
    setAuthorRight(JSON.parse(authorRighted));

    const authorYPosition = localStorage.getItem('authorYPosition');
    setAuthorYPosition(JSON.parse(authorYPosition));
  }, [])

  useEffect(() => {
  localStorage.setItem('titlechange', JSON.stringify(titleChange));
  localStorage.setItem('size', size);
  localStorage.setItem('textColor', JSON.stringify(textColor));
  localStorage.setItem('author', JSON.stringify(author));
  localStorage.setItem('authorSize', JSON.stringify(authorSize));
  localStorage.setItem('bold', JSON.stringify(bold));
  localStorage.setItem('authorColor', JSON.stringify(authorColor));
  localStorage.setItem('selectedColor', JSON.stringify(selectedColor));
  localStorage.setItem('center', JSON.stringify(center));
  localStorage.setItem('right', JSON.stringify(right));
  localStorage.setItem('left', JSON.stringify(left));
  localStorage.setItem('yPosition', JSON.stringify(yPosition));
  localStorage.setItem('textBackground', JSON.stringify(textBackground));
  localStorage.setItem('authorCentered', JSON.stringify(authorCentered));
  localStorage.setItem('authorLefted', JSON.stringify(authorLefted));
  localStorage.setItem('authorRighted', JSON.stringify(authorRighted));
  localStorage.setItem('authorYPosition', JSON.stringify(authorYPosition));
  localStorage.setItem('image', JSON.stringify(image));
  }, [titleChange, size, textColor, author, authorSize, bold, authorColor, selectedColor, image, center, left, right, yPosition, textBackground, authorLefted, authorCentered, authorRighted, authorYPosition]);

  const deleteData = () => {
    localStorage.removeItem('title', JSON.stringify(titleChange));
    localStorage.removeItem('size', size);
    localStorage.removeItem('textColor', JSON.stringify(textColor));
    localStorage.removeItem('author', JSON.stringify(author));
    localStorage.removeItem('authorSize', JSON.stringify(authorSize));
    localStorage.removeItem('bold', JSON.stringify(bold));
    localStorage.removeItem('authorColor', JSON.stringify(authorColor));
    localStorage.removeItem('selectedColor', JSON.stringify(selectedColor));
    localStorage.removeItem('image', JSON.stringify(image));
    localStorage.removeItem('center', JSON.stringify(center));
    localStorage.removeItem('right', JSON.stringify(right));
    localStorage.removeItem('left', JSON.stringify(left));
    localStorage.removeItem('authorCentered', JSON.stringify(authorCentered));
    localStorage.removeItem('authorLefted', JSON.stringify(authorLefted));
    localStorage.removeItem('authorRighted', JSON.stringify(authorRighted));
    localStorage.removeItem('yPosition', JSON.stringify(yPosition));
    localStorage.removeItem('authorYPosition', JSON.stringify(authorYPosition));
    setDeleteModal(false);
    setSelectedColor(null);
    setTitleChange('');
    setSize(16);
    setTextColor('');
    setAuthor('');
    setAuthorSize(16);
    setBold(false);
    setAuthorColor('');
    setImage('');
    setCenter(false);
    setLeft(false);
    setRight(false);
    setAuthorCenter(false);
    setAuthorLeft(false);
    setAuthorRight(false);
    setYposition(0);
    setAuthorYPosition(0);

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
          <TextField size='small' type='text' value = {authorColor} onChange={(e) => setAuthorColor(e.target.value)} className='w-24'/>
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

        <div className='flex flex-col gap-4'>
          <h2>ფონის სურათი:</h2>
          <TextField size='small' label = "ჩაწერეთ ლინკი" onChange={(e) => changeBackgroundImage(e.target.value)}/>
          <Button onClick={downloadScreenshot} color = "success" variant='contained'>ჩამოტვირთეთ სურათი</Button>
        </div>
      </div>
  
      <div className='w-1/2 h-4/5 -mt-16 bg-white shadow-lg rounded-md' style={{backgroundColor: selectedColor, backgroundImage: image, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', objectFit: 'cover'}} ref ={canvasRef}>
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
     <h2 style={{fontSize: authorSize + "px", textAlign: authorCentered ? "center" : authorRighted ? "end" : authorLefted ? "start" : null, marginTop: authorYPosition + "px", color: authorColor }} className='cursor-pointer' onClick={() => setAuthorSettings(true)}>{author}</h2>

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
  <DeleteForeverIcon sx={{fontSize: 40}} className='cursor-pointer absolute bottom-4 right-4' onClick = {() => setDeleteModal(true)} />
  {deleteModal && (
    <div className='bg-gray-200 w-2/5 absolute left-1/2 top-2/4 -translate-x-1/2 ml-44 h-56 rounded-md shadow-lg flex flex-col gap-12 p-12 '>
      <h1 className='text-center text-2xl'>ნამდვილად გსურთ წაშლა? მერე არ ინანოთ</h1>
 <div className='flex px-12 gap-4'>
      <Button variant='contained' color = "success" className='w-full' onClick={deleteData} >წაშლა</Button>
      <Button variant='outlined' color = "success" className='w-full' onClick={() => setDeleteModal(false)}>გაუქმება</Button>
      </div>
      </div>
  )}
</div>
  

    </div>
  )
}

export default Design
