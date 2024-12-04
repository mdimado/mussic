import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Shop from '../pages/Songs';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Fav from '../pages/Fav';
import AdminSongsPanel from '../pages/AdminSongsPanel';
import RecipeUploadForm from '../pages/SongUploadForm';

const categoryOptions = [
  "Pop",
  "Rock",
  "Hip-Hop/Rap",
  "Electronic/Dance",
  "R&B/Soul",
  "Classical",
];

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="songs" element={<Shop />} />
      <Route path="upload" element={<RecipeUploadForm />} />
      <Route path="admin" element={<AdminSongsPanel />} />
      <Route path="fav" element={<Fav />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      {categoryOptions.map((category) => (
        <Route
          key={category}
          path={`/${category.toLowerCase().replace(/\s+/g, "-")}`}
          element={<Shop category={category} />}
        />
      ))}


      <Route path="insta/*" element={<Navigate to="https://www.instagram.com/aandm_fashion_retailor/?hl=en" target="_blank" replace />} />

    </Routes>
  );
};

export default Routers;
