import {createContext, useEffect, useState} from 'react';

export const BookContext = createContext();


const BookProvider = ({children}) => {

  const [books, setBooks] = useState([]);

  const [cart, setCart] = useState(() => {

    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : 0;
  });

  const [myBookCover, setMyBookCover] = useState(() => {
    const savedMyBookCover = localStorage.getItem('myBookCover');
    return savedMyBookCover ? JSON.parse(savedMyBookCover) : [];
  });

  useEffect(() => {
    localStorage.setItem('myBookCover', JSON.stringify(myBookCover));
  }, [myBookCover]);


  const [cartItem, setCartItem] = useState([]);
   const base64 = myBookCover.join();

   const [useUrl, setUseUrl] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <BookContext.Provider value = {{books, setBooks, cart, setCart, cartItem, setCartItem, myBookCover, setMyBookCover, base64, useUrl, setUseUrl}}>
        {children}
    </BookContext.Provider>
  )
}


export default BookProvider;