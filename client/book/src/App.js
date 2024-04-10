import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Profile from './components/Profile';
import Create from './components/Create';
import FullPage from './components/FullPage';
import Cart from './components/Cart';
import Design from './components/Design';
import MyDesign from './components/MyDesign';
import MyBooks from './components/MyBooks';
import UpdateBook from './components/UpdateBook';
import Comments from './components/Comments';
import MyProfile from './components/MyProfile';
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';
import { useContext, useEffect } from 'react';
import { BookContext } from './context/bookContext';


function App() {
  const isUserLoggedIn = localStorage.getItem('token');

  const  { isDarkMode } = useContext(BookContext);

  useEffect(() => {
    if(isDarkMode) {
      document.body.style.background ='linear-gradient( #31363F, #31363F)';
      document.body.style.transition = 'all 0.9s ease-in';
      
    }else {
      document.body.style.background = 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)';
    }
  }, [isDarkMode]);
  return (
    <div className="App">
      <Header />
       <Routes>
        <Route path = "/" element = {<Home />} />
   
        
         <Route path="/profile" element={<Profile />} /> 
         <Route path = "/create" element = {<Create />} />
         <Route path = "/books/:id" element = {<FullPage />} >
             <Route path = "comment" element =  {<Comments />} />
         </Route>
         <Route path = "/cart" element = {<Cart />} />
         <Route path = "/design" element = {<Design />} />
         <Route path = "/myDesign" element = {<MyDesign />} />
         <Route path = "/myBooks" element = {<MyBooks />} />
         <Route path = "/books/:id/update" element = { <UpdateBook />} />
         <Route path = "/myProfile" element = { <MyProfile />} />
         <Route path = "*" element = {<ErrorPage />}/>
         <Route path = "/login" element = {<Login />} />
       </Routes>
    </div>
  );
}

export default App;
