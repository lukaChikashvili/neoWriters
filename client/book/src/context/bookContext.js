import {createContext, useState} from 'react';

export const BookContext = createContext();


const bookPorivder = ({children}) => {
  const [books, setBooks] = useState([]);


  return (
    <BookContext.Provider value = {{books, setBooks}}>
        {children}
    </BookContext.Provider>
  )
}


export default bookPorivder;