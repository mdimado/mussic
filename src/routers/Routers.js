import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Login from "../pages/Login";
import Signup from "../pages/Signup"
import MusicPlayer from '../pages/MusicStreamingApp';



import ProtectedRoute from './ProtectedRoute';



const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="streaming" element={<MusicPlayer />} />
      

      <Route path="/*" element={<ProtectedRoute />}>
        
      </Route>

      
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      
    </Routes>
  );
};

export default Routers;
