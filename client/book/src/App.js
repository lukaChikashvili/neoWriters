import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Profile from './components/Profile';


function App() {
  const isUserLoggedIn = localStorage.getItem('token');

  return (
    <div className="App">
      <Header />
       <Routes>
        <Route path = "/" element = {<Home />} />
   
        <Route
          path="/profile"
          element={
            isUserLoggedIn ? (
              <Profile />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
       </Routes>
    </div>
  );
}

export default App;
