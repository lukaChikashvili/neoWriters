import React, { useContext, useEffect, useRef, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from './axios';
import lari from '../assets/lari.png';
import tag from '../assets/tag.png';
import { Button, TextField } from '@mui/material';
import { BookContext } from '../context/bookContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactImageMagnify from 'react-image-magnify';

const FullPage = () => {
    
    // take id from route
    const { id } = useParams();
    const [fullPage, setFullPage] = useState(null);
    const { books, setCart, setCartItem,  showLari,  setShowLari, isDarkMode} = useContext(BookContext);

  

    useEffect(() => {
        const getFull = async () => {
         const response = await axiosInstance.get(`http://localhost:4000/api/books/${id}`);

           setFullPage(response.data.oneBook);

        
        
        }


        getFull();
    }, []);

const addToCart = (id) => {
    setCart(prev => prev + 1);

    const filteredBook = books.find(item => item._id === id);

   
    if (filteredBook) {
     
        setCartItem(prev => [...prev, filteredBook]);
    } else {
        console.log(`Book with id ${id} not found.`);
    }

  

    
}


const [buyModal, setBuyModal] = useState(false);


// preview modal
const [preview, setPreview] = useState(false);



// show modal
const buyBook = () => {
   setBuyModal(true);
   
}

let buttonRef = useRef();




    const handlePurchase = (price) => {
      
            let result = showLari - price;
            setShowLari(result);
           buttonRef.current.disabled = true;
     
        }
          
          
    
       let navigate = useNavigate();
       let previewRef = useRef(null);

    
const handlePreview = () => {
  setPreview(true);
}    


const handleComment = (id) => {
   navigate(`/books/${id}/comment`);
}

// close preview modal on outside click
useEffect(() => {
   
    const detectClick = (e) => {
      if(previewRef.current && !previewRef.current.contains(e.target))  {
         setPreview(false);
      }
    }


    document.addEventListener('mousedown', detectClick);

    return () => {
        document.removeEventListener('mousedown', detectClick);
    }
}, [])

  return (
    <div className='p-24 px-56' >

          {preview && <div className='w-3/5 h-4/5 mt-12 rounded-md shadow-lg bg-white border-4  border-green-500 absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 overflow-y-auto' ref = {previewRef}>
          <span className='absolute top-4 right-4 text-2xl font-semibold cursor-pointer' onClick={() => setPreview(false)}>X</span>

          <p className='text-xl'>{fullPage.text}</p>
            </div>}
  


        {buyModal && <div className='w-4/5 h-4/5 mt-12 rounded-md shadow-lg bg-white border-4  border-green-500 absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 flex flex-col gap-12'>
            <span className='absolute top-4 right-4 text-2xl font-semibold cursor-pointer' onClick={() => setBuyModal(false)}>X</span>
               <h1 className='text-5xl font-bold'>ბალანსი: <span>{ showLari}</span></h1>
               <p className='text-2xl'>აირჩიეთ გადახდის მეთოდი: </p>
               <div className='flex gap-12'>
              
               
             
             
                
               </div>
               {fullPage &&  (
                <div className='flex gap-12' style={{color: isDarkMode && '#fff'}}>
                    <img src = {fullPage.url} className='w-56 h-76 object-cover cursor-pointer shadow-lg rounded-md absolute right-56 top-8'/>
                    <p className='text-3xl'>{fullPage.price}</p>
                    <Button variant='outlined' color = "success" onClick={() => handlePurchase(fullPage.price)} ref = {buttonRef}>გადახდა</Button>
                    </div>
                )}
            </div>}


        {fullPage ? (
            <div className='flex items-center gap-12'>
        <div className='flex flex-col gap-6'>



<div className='w-64 '>
        <ReactImageMagnify {...{
    smallImage: {
        
        isFluidWidth: true,
        src: fullPage.url,
        
    },
    largeImage: {
        src: fullPage.url,
       width: 1200,
       height: 1600
       
    }
}} />
</div>
         
         <Button variant={'text'} color = "success" className='flex gap-8' style = {{fontWeight: isDarkMode && 'bold'}} onClick={handlePreview}> <VisibilityIcon /> უფასო ნაწილის წაკითხვა </Button>
   </div>
         <div className='flex flex-col gap-4 w-4/5' style={{color: isDarkMode && '#fff'}}>
            <h1 className='text-4xl font-bold'>{fullPage.title}</h1>
            <p className='text-2xl text-green-600'>{fullPage.author.name}</p>
            <p className='text-2xl'>{fullPage.createdAt.substring(0, 10)}</p>
            <p className='text-2xl underline underline-offset-4'>{fullPage.type}</p>
            
             <p className='flex text-5xl  absolute right-52 top-56 font-semibold'>{fullPage.price}</p>
              
             
            <p className='line pt-4 text-lg'>{fullPage.desc}</p>
            <div className='flex gap-8 '>
            <Button variant='outlined' color = "success" className = "w-56" style = {{fontWeight: isDarkMode && 'bold'}} onClick={() => addToCart(fullPage._id)}>კალათში დამატება</Button>
        <Button variant='contained' color = "success"  className = "w-56"  onClick={() => buyBook(fullPage._id)}>ყიდვა</Button>
            </div>
            </div>
           
                </div>
        ) : (
            <p style={{color: isDarkMode && '#fff'}}>იტვირთება...</p>
        )}
    

    <div className='pt-12' style={{color: isDarkMode && '#fff'}}>
        <h2 className='text-2xl pb-8' onClick={() => handleComment(fullPage._id)}>კომენტარების ჩვენება</h2>
     
   <Outlet />
  
    </div>
    </div>
  )
}

export default FullPage
