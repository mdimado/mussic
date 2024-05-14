import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';
import { favActions } from '../../redux/slices/favSlice';
import '../../styles/product-car.css'

const RecipeCard = ({ item }) => {
  const dispatch = useDispatch();
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToCart = () => {
    if (!selectedIngredient || !selectedCategory) {
      // Show the modal to select ingredient and category
      setIsModalOpen(true);
      return;
    }

    const newItem = {
      id: item.id,
      title: item.title,
      category: item.category,
      instructions: item.instructions,
      imgUrl: item.imgUrl,
      ingredients: item.ingredients,
    };

    dispatch(cartActions.addItem(newItem));
    setSelectedIngredient('');
    setSelectedCategory('');

    // Close the modal after adding the item to the cart
    setIsModalOpen(false);
    
    toast.success('Recipe added successfully');
  };

  const handleIngredientSelection = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const addToFavorites = () => {
    dispatch(
      favActions.addItem({
        id: item.id,
        title: item.title,
        category: item.category,
        instructions: item.instructions,
        imgUrl: item.imgUrl,
        ingredients: item.ingredients,
      })
    );

    toast.success('Recipe added to Favorites');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Calculate average rating
  const averageRating = item.rating ? item.rating / item.numReviews : 0;

  // Render stars based on average rating
  const starIcons = [];
  const roundedRating = Math.round(averageRating);
  for (let i = 0; i < 5; i++) {
    starIcons.push(
      <i
        key={i}
        className={i < roundedRating ? "ri-star-fill" : "ri-star-line"}
      />
    );
  }

  return (
    <Col lg='12' md='1' className='mb-2 grey'>
      <div className='product__item'>
        <Link to={`/recipes/${item.id}`}>
          <div className='recipe__img'>
            <img
              whileHover={{ scale: 0.9 }}
              src={item.imgUrl}
              alt=''
              style={{ height: 200, objectFit: 'contain' }}
            />
          </div>
        </Link>
        <div className='p-2 product__info'>
          <Link to={`/recipes/${item.id}`}>
            <h3 className='product__name'>{item.title}</h3>
          </Link>
         
        </div>
        <div className='flexend'>
          <div className="stars">{starIcons} <p>({item.numReviews})</p></div>
          <div onClick={addToFavorites} className="h_a">
            <i className='helo ri-heart-add-line'></i>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default RecipeCard;
