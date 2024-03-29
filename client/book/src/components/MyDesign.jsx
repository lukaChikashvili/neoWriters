import React, { useContext } from 'react'
import { BookContext } from '../context/bookContext';
import { useNavigate } from 'react-router-dom';


const MyDesign = () => {
 // take myBook array from context
    const { myBookCover, setUseUrl } = useContext(BookContext);
    let navigate = useNavigate();

   const publishCover = () => {
     setUseUrl(true);
     navigate('/create');
   }

  return (
    <div className='flex flex-wrap' >
      {myBookCover.map((value, i) => (
        <div className='flex items-center flex-col '>
        <img src = {value} key = {i} className='w-96 h-96 p-12'/>
        <button onClick={publishCover} >გამოიყენე</button>
       
        </div>
      ))}
    </div>
  )
}

export default MyDesign
