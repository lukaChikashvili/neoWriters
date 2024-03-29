import React, { useContext } from 'react'
import { BookContext } from '../context/bookContext';
import { useNavigate } from 'react-router-dom';


const MyDesign = () => {
 // take myBook array from context
    const { myBookCover, setUseUrl, setSelectedItemUrl , selectedItemUrl } = useContext(BookContext);
    let navigate = useNavigate();

    const publishCover = (id) => {
      setUseUrl(true);
      navigate('/create');
  
     
      const filtered = myBookCover.filter(item => item.id === id);
      const urls = filtered.map(item => item.url);
     
      setSelectedItemUrl(urls.join());

    }

  return (
    <div className='flex flex-wrap' >
      {myBookCover.map((value, i) => (
        <div className='flex items-center flex-col '>
        <img src = {value.url} key = {value.id} className='w-96 h-96 p-12'/>
        <button onClick={() => publishCover(value.id)} >გამოიყენე</button>
       
        </div>
      ))}
    </div>
  )
}

export default MyDesign
