import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Profile from './components/Profile';
import Create from './components/Create';


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
       </Routes>
    </div>
  );
}

export default App;
