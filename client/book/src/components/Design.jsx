import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import TextFormatIcon from '@mui/icons-material/TextFormat';

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

        <div className='flex items-center gap-10'>
        <h1 className='text-xl '> ავტორი: </h1>
        <TextField size='small' label = "ავტორი..." className='w-56' />
        </div>

        <div>
          <h1  className='text-xl pb-4 '>აირჩიეთ ფერი:</h1>
        
        {colors.map((value) => (
          <div className='inline-flex gap-4 mr-2' key={value.id}>
           <div style={{backgroundColor: value.name}} className='w-8 h-8 rounded-md shadow cursor-pointer' onClick={() => changeBackground(value.name)}></div>
           </div>
        ))}
        </div>
      </div>
  
      <div className='w-1/2 h-4/5 -mt-16 bg-white shadow-lg rounded-md' style={{backgroundColor: selectedColor}}>
      <h1 className='cursor-pointer' style={{fontSize: size + 'px', textAlign: center ? "center" : right ? "end" : left ? "start" : null, marginTop: yPosition + "px"}} onClick={() => setSettings(true)} >{titleChange}</h1>
      {settings && (
        <div className='grid grid-cols-3'>
          
          <Button color = "success" onClick={handleLeft}>მარცხნივ</Button>
          <Button  color = "success" onClick={handleCenter} >ცენტრში</Button>
          <Button color = "success" onClick={handleRight}>მარჯვნივ</Button>
          <span>y:</span><TextField size = "small" type = "number" className='w-24' value = {yPosition} onChange={(e) => setYposition(e.target.value)} />
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
