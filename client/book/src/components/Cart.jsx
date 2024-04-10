import React, { useContext, useEffect, useState } from 'react'
import { BookContext } from '../context/bookContext';

const Cart = () => {
    const { cartItem, setCartItem, isDarkMode, setCart} = useContext(BookContext);
    // total price
    const [totalPrice, setTotalPrice] = useState(0);
    const [stock, setStock] = useState({});


    useEffect(() => {
      localStorage.setItem('cartItem', JSON.stringify(cartItem));
  }, [cartItem]);

  useEffect(() => {
    let sum = 0;
    let initialStock = {};

    cartItem.forEach((item) => {
      sum += parseFloat(item.price);
   
      initialStock[item._id] = 1;
    });
    setTotalPrice(sum);
   
    setStock(initialStock);
}, [cartItem]);


const doubleSum = (itemId) => {
  

    setCartItem(prevCartItems => {
      return prevCartItems.map(item => {
        if (item._id === itemId) {
          return {
            ...item,
            price: (parseFloat(item.price) * 2).toFixed(2)
          };
        }
        return item;
      });
    });

    setStock(prevStock => ({
      ...prevStock,
      [itemId]: (prevStock[itemId] || 0) + 1
  }));
}

const minusSum = (itemId) => {
  if (stock[itemId] > 0) {
      setStock(prevStock => ({
          ...prevStock, 
          [itemId]: prevStock[itemId] - 1
      }));

      setCartItem(prevCartItems => {
        return prevCartItems.map(item => {
          if (item._id === itemId) {
            return {
              ...item,
              price: (parseFloat(item.price) / 2).toFixed(2)
            };
          }
          return item;
        });
      });
  }
}

// delete cart item
const deleteItem = (id) => {
  setCartItem(prevCartItems => {
    const updatedCartItems = prevCartItems.filter(item => item._id !== id);
    setCart(prevCart => prevCart - 1); 
    return updatedCartItems;
  });


  

  
}
  return (
    <div className='p-16 '>
        <h1 className='text-xl md:text-5xl font-bold pb-8 '  style={{color:isDarkMode && '#fff'}}>ჩემი კალათა</h1>
        <h2 className='text-2xl md:text-5xl absolute top-40 right-36'  style={{color:isDarkMode && '#fff'}}>{totalPrice.toFixed(2)}</h2>
      {cartItem.map((value) => (
            
        <div className='pt-6 px-12 flex flex-col md:flex-row items-center gap-12 bg-gray-300 '>
           <img src = {value.url} className='w-36' />
           <p key={value._id} >{value.title}</p>
           <p className='font-bold text-2xl'>{value.price === 0 ? 'უფასო' : value.price}</p>
          
           <button onClick={() => minusSum(value._id)} className='text-xl'>-</button>
           <p className='text-xl'>{stock[value._id]}</p>
           <button onClick={() => doubleSum(value._id)} className='text-xl'>+</button>
         
           <h2 className='text-4xl absolute  right-12  md:right-36 cursor-pointer' onClick={() => deleteItem(value._id)}>X</h2>
        </div>
      ))}
    </div>
  )
}

export default Cart
