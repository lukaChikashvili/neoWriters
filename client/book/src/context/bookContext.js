import {createContext, useState} from 'react';

export const BookContext = createContext();


const BookProvider = ({children}) => {

  const [books, setBooks] = useState([]);

  const [cart, setCart] = useState(0);
  return (
    <BookContext.Provider value = {{books, setBooks, cart, setCart}}>
        {children}
    </BookContext.Provider>
  )
}


export default BookProvider;