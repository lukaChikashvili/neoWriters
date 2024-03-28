import {createContext, useEffect, useState} from 'react';

export const BookContext = createContext();


const BookProvider = ({children}) => {

  const [books, setBooks] = useState([]);

  const [cart, setCart] = useState(() => {

    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : 0;
  });

  const [myBookCover, setMyBookCover] = useState([]);

  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <BookContext.Provider value = {{books, setBooks, cart, setCart, cartItem, setCartItem, myBookCover, setMyBookCover}}>
        {children}
    </BookContext.Provider>
  )
}


export default BookProvider;