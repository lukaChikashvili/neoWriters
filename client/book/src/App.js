import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Profile from './components/Profile';
import Create from './components/Create';
import FullPage from './components/FullPage';
import Cart from './components/Cart';
import Design from './components/Design';
import MyDesign from './components/MyDesign';


function App() {

  return (
    <div className="App">
      <Header />
       <Routes>
        <Route path = "/" element = {<Home />} />
   
        <Route
          path="/profile"
          element={
          
              <Profile />
            
          }
        />
         <Route path = "/create" element = {<Create />} />
         <Route path = "/books/:id" element = {<FullPage />} />
         <Route path = "/cart" element = {<Cart />} />
         <Route path = "/design" element = {<Design />} />
         <Route path = "/myDesign" element = {<MyDesign />} />
       </Routes>
    </div>
  );
}

export default App;
