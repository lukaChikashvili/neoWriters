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

   const [selectedItemUrl, setSelectedItemUrl] = useState('');

   // error message
   const [err, setErr] = useState(false);
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

   // show password
   const [showPassword, setShowPassword] = useState(false);

   // show password function
   const handleShowPassword = () => setShowPassword((show) => !show);
 
   const handleMouseDownPassword = (event) => {
     event.preventDefault();
   };

   // currencies
   const [showDollar, setShowDollar] = useState(false);
const [showEuro, setShowEuro] = useState(false);
const [showLari, setShowLari] = useState(false);
  return (
    <BookContext.Provider value = {{showPassword, setShowPassword, handleShowPassword, handleMouseDownPassword, err, setErr, selectedItemUrl, setSelectedItemUrl, books, setBooks, cart, setCart, cartItem, setCartItem, myBookCover, setMyBookCover, base64, useUrl, setUseUrl, showDollar, showEuro, showLari, setShowDollar, setShowEuro, setShowLari}}>
        {children}
    </BookContext.Provider>
  )
}


export default BookProvider;