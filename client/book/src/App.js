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
import ResetPass from './components/ResetPass';


function App() {
  const isUserLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="App">
      <Header />
       <Routes>
        <Route path = "/" element = {<Home />} />
   
       {isUserLoggedIn ? (
        <Route
          path="/profile"
          element={
          
            <Profile />
            
          }
        />
       ) :  <Route
       path="/profile"
       element={
       
        <Navigate to = "/" />
         
       }
     />} 
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
         <Route path = "/reset" element = { <ResetPass />} />
       </Routes>
    </div>
  );
}

export default App;
