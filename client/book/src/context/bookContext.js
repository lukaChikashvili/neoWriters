import {createContext, useEffect, useState} from 'react';
import axiosInstance from '../components/axios';


export const BookContext = createContext();


const BookProvider = ({children}) => {

  const [books, setBooks] = useState([]);


  const [cart, setCart] = useState(() => {

    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : 0;
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  
  const [myBookCover, setMyBookCover] = useState(() => {
    const savedMyBookCover = localStorage.getItem('myBookCover');
    return savedMyBookCover ? JSON.parse(savedMyBookCover) : [];
  });

  useEffect(() => {
    localStorage.setItem('myBookCover', JSON.stringify(myBookCover));
  }, [myBookCover]);

  

  const [cartItem, setCartItem] = useState(() => {
    const savedCartItem = localStorage.getItem('cartItem');
    return savedCartItem ? JSON.parse(savedCartItem) : [];
});


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

   // responsive modal
   const [responsiveModal, setResponsiveModal] = useState(false);

// errors
const [nameErr, setNameErr] = useState(false);
const [passErr, setPassErr] = useState(false);
// incorrect credential error
const [incorrect, setIncorrect] = useState(false);


// dark mode
const [isDarkMode, setIsDarkMode] = useState(() => {
  return JSON.parse(localStorage.getItem('isDarkMode')) || false;
});


const toggleDarkMode = () => {
  setIsDarkMode(prevMode => {
    const newMode = !prevMode;
  
    localStorage.setItem('isDarkMode', JSON.stringify(newMode));
    return newMode;
});
  
  };

  useEffect(() => {

    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
}, [isDarkMode]);

  const toggleLightMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  }



  return (
    <BookContext.Provider value = {{setCart, isDarkMode, toggleDarkMode, toggleLightMode, nameErr, setNameErr, passErr, setPassErr, incorrect, setIncorrect, responsiveModal, setResponsiveModal, fetchImages, uploadModal, setUploadModal, image, setImage, showPassword, setShowPassword, handleShowPassword, handleMouseDownPassword, err, setErr, selectedItemUrl, setSelectedItemUrl, books, setBooks, cart, setCart, cartItem, setCartItem, myBookCover, setMyBookCover, base64, useUrl, setUseUrl, showLari,  setShowLari}}>
        {children}
    </BookContext.Provider>
  )
}


export default BookProvider;