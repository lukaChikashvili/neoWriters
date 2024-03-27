import React, { useContext, useEffect } from 'react'
import { BookContext } from '../context/bookContext';

const Cart = () => {
    const { cartItem, setCartItem} = useContext(BookContext);



  return (
    <div>
      {cartItem.map((value) => (
        <p key={value._id}>{value.title}</p>
      ))}
    </div>
  )
}

export default Cart
