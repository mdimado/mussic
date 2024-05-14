import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import ProductDetails from '../pages/ProductDetails';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Aboutus from '../pages/Aboutus';
import Fav from '../pages/Fav';
import AdminSongsPanel from '../pages/AdminSongsPanel';
import NotFound from '../pages/NotFound';
import RecipeUploadForm from '../pages/RecipeUploadForm';

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
      <Route path="cart" element={<Cart />} />
      <Route path="upload" element={<RecipeUploadForm />} />
      <Route path="admin" element={<AdminSongsPanel />} />
      <Route path="fav" element={<Fav />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="aboutus" element={<Aboutus />} />

      {/* Dynamic routes for each category */}
      {categoryOptions.map((category) => (
        <Route
          key={category}
          path={`/${category.toLowerCase().replace(/\s+/g, "-")}`}
          element={<Shop category={category} />}
        />
      ))}

      {/* Route for product details */}
      <Route path="songs/:id" element={<ProductDetails />} />

      {/* Redirect to Instagram */}
      <Route path="insta/*" element={<Navigate to="https://www.instagram.com/aandm_fashion_retailor/?hl=en" target="_blank" replace />} />

      {/* 404 Page Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
