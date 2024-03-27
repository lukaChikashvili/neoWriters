import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Profile from './components/Profile';
import Create from './components/Create';
import FullPage from './components/FullPage';


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
       </Routes>
    </div>
  );
}

export default App;
