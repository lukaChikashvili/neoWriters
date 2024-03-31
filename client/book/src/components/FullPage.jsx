import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from './axios';
import lari from '../assets/lari.png';
import tag from '../assets/tag.png';
import { Button } from '@mui/material';
import { BookContext } from '../context/bookContext';

const FullPage = () => {
    
    // take id from route
    const { id } = useParams();
    const [fullPage, setFullPage] = useState(null);
    const { books, setCart, setCartItem, cartItem} = useContext(BookContext);

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



// show modal
const buyBook = () => {
   setBuyModal(true);
   
}

const [showDollar, setShowDollar] = useState(false);
const [showEuro, setShowEuro] = useState(false);
const [showLari, setShowLari] = useState(false);

const showTheLari = () => {
    setShowDollar(false);
    setShowEuro(false);
    setShowLari(true);
}

const showTheDollar = () => {
    setShowDollar(true);
    setShowEuro(false);
    setShowLari(true);
}

const showTheEuro = () => {
    setShowDollar(false);
    setShowEuro(true);
    setShowLari(false);
}

  return (
    <div className='p-24 px-56' >
        {buyModal && <div className='w-4/5 h-4/5 mt-12 rounded-md shadow-lg bg-white border-4  border-green-500 absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 flex flex-col gap-12'>
            <span className='absolute top-4 right-4 text-2xl font-semibold cursor-pointer' onClick={() => setBuyModal(false)}>X</span>
               <h1 className='text-5xl font-bold'>ბალანსი: <span>{showDollar ? "185.53" : showEuro ? '171.78' : showLari ? '500' : ''}</span></h1>
               <p className='text-2xl'>აირჩიეთ გადახდის მეთოდი: </p>
               <div className='flex gap-12'>
               <Button variant = "contained" color = "success" className='w-36' onClick={showTheLari}>ლარი</Button>
               <Button variant = "contained" color = "error" className='w-36' onClick={showTheDollar} >დოლარი</Button>
               <Button variant = "contained" color = "secondary" className='w-36' onClick={showTheEuro}>ევრო</Button>
             
                
               </div>
               {fullPage &&  (
                    <img src = {fullPage.url} className='w-56 h-76 object-cover cursor-pointer shadow-lg rounded-md absolute right-56 top-8'/>
                )}
            </div>}


        {fullPage ? (
            <div className='flex items-center gap-12'>
 
         <img src = {fullPage.url} className='w-96 h-96 object-cover cursor-pointer shadow-lg rounded-md'/>
         
   
         <div className='flex flex-col gap-4 '>
            <h1 className='text-4xl font-bold'>{fullPage.title}</h1>
            <p className='text-2xl text-green-600'>{fullPage.author.name}</p>
            <p className='text-2xl'>{fullPage.createdAt.substring(0, 10)}</p>
            <p className='text-2xl underline underline-offset-4'>{fullPage.type}</p>
             <img src = {tag} className='w-40 absolute right-40' />
             <p className='flex text-5xl  absolute right-52 top-56 text-white'>{fullPage.price}</p>
              
             
            <p className='line pt-4 text-lg'>{fullPage.desc}</p>
            <div className='flex gap-8 '>
            <Button variant='outlined' color = "success" className = "w-56" onClick={() => addToCart(fullPage._id)}>კალათში დამატება</Button>
        <Button variant='contained' color = "success"  className = "w-56" onClick={() => buyBook(fullPage._id)}>ყიდვა</Button>
            </div>
            </div>
           
                </div>
        ) : (
            <p>იტვირთება...</p>
        )}
    
    </div>
  )
}

export default FullPage
