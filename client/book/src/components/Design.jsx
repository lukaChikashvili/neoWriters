import React, { useState } from 'react'
import { TextField } from '@mui/material';

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
      id: 6,
      name: 'white'
    }



  ];

  const [selectedColor, setSelectedColor] = useState(null);

  

  // change background function
  const changeBackground = (name) => {
    setSelectedColor(name);
  }
  return (
    <div className='flex items-center justify-between h-screen pr-4 '>
      
      <div className='bg-gray-300 w-1/4 h-screen p-8 flex flex-col gap-4 '>
        <div className='flex items-center gap-8'>
        <h1 className='text-xl '> სათაური: </h1>
        <TextField size='small' label = "სათაური..." className='w-56' />
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
      
</div>

<div>
  sidebar
</div>
  

    </div>
  )
}

export default Design
