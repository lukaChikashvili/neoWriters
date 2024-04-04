import {createContext, useEffect, useState} from 'react';
import axiosInstance from '../components/axios';

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

   // images
   const [image, setImage] = useState([]);

   // error message
   const [err, setErr] = useState(false);

   const [uploadModal, setUploadModal] = useState(false);

  
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
   const [showLari, setShowLari] = useState(() => {
    const data =  localStorage.getItem('balance');
    return data ? JSON.parse(data) : 500;
  });

   useEffect(() => {
    localStorage.setItem('balance', JSON.stringify(showLari));
  }, [showLari]);



    const fetchImages = async (userId) => {
       try {
          const response = await axiosInstance.get(`http://localhost:4000/api/users/${userId}/profileImage`,  {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
            }
         });
          setImage(response.data);
         
       } catch (error) {
         console.log(error);
       }
    }

   




  return (
    <BookContext.Provider value = {{fetchImages, uploadModal, setUploadModal, image, setImage, showPassword, setShowPassword, handleShowPassword, handleMouseDownPassword, err, setErr, selectedItemUrl, setSelectedItemUrl, books, setBooks, cart, setCart, cartItem, setCartItem, myBookCover, setMyBookCover, base64, useUrl, setUseUrl, showLari,  setShowLari}}>
        {children}
    </BookContext.Provider>
  )
}


export default BookProvider;