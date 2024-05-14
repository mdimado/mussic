import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Col } from 'reactstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { favActions } from '../../redux/slices/favSlice';
import '../../styles/product-card.css';

const RecipeCard = ({ item, onPlaySong }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const currentPlaying = useSelector((state) => state.playback.currentPlaying);
  const isPlaying = currentPlaying === item.id;

  const addToFavorites = () => {
    dispatch(
      favActions.addItem({
        id: item.id,
        title: item.title,
        category: item.category,
        artist: item.artist,
        imgUrl: item.imgUrl,
        songUrl: item.songUrl,
      })
    );

    toast.success('Song added to Favorites');
  };

  useEffect(() => {
    // Clean up event listener on component unmount
    return () => {
      const cardElement = document.getElementById(`card-${item.id}`);
      if (cardElement) {
        cardElement.removeEventListener('click', handleCardClick);
      }
    };
  }, [item]);

  const handleCardClick = () => {
    onPlaySong(item); // Trigger play song function when card is clicked
  };

  return (
    <Col lg='3' md='1' className='mb-2 grey'>
      <div
        className='product__item'
        id={`card-${item.id}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='recipe__img'>
          <img
            src={item.imgUrl}
            alt=''
            style={{ height: 200, objectFit: 'contain' }}
          />
          {isHovered && (
            <div
              className={`play__button ${isPlaying ? 'pause' : 'play'}`}
              onClick={handleCardClick}
            >
              <i className={`ri-${isPlaying ? 'pause' : 'play'}-circle-fill`}></i>
            </div>
          )}
        </div>
        <div className='p-2 product__info'>
          <h3 className='product__name'>{item.title} by {item.artist}</h3>
        </div>
        <div className='flexend'>
        <p>{item.category}</p>
          <div onClick={addToFavorites} className='h_a'>
            <i className='helo ri-heart-add-line'></i>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default RecipeCard;
