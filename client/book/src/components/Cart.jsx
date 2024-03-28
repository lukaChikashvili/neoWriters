import React, { useContext, useEffect } from 'react'
import { BookContext } from '../context/bookContext';

const Cart = () => {
    const { cartItem, setCartItem} = useContext(BookContext);



  return (
    <div className='p-20 '>
        <h1 className='text-5xl font-bold '>ჩემი კალათა</h1>
      {cartItem.map((value) => (
        <div className='pt-6 flex items-center gap-12 bg-gray-300'>
           <img src = {value.url} className='w-36' />
        <p key={value._id} >{value.title}</p>
        </div>
      ))}
    </div>
  )
}

export default Cart
