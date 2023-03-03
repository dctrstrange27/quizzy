import './App.css';
import { BrowserRouter as Router, Outlet, Route, Routes } from "react-router-dom";
import Yours from './sideNav/Yours';
import Shared from './sideNav/Shared';
import Home from './Home/Home';
import { useState } from 'react';
import Login from './Login/Login';
const App = () => {

  const handleLogin= async()=>{


  }





  return (
    <div className="App bg-[#f4f4f4] w-full h-full border-[20px border-r-b2">
    <div className=' border-[5px h-full border-r-b2'>
    <Router>
        <Routes>
          <Route  path='home' element={<Home />}>
            <Route path="yours" element={<Yours />} />
            <Route path="shared" element={<Shared />} />
          </Route>
          <Route path='login' element={<Login />} />
        </Routes>
        <Outlet />
      </Router>
    </div>

    </div>
  );
}
export default App;
