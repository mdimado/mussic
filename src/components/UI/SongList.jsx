import React from "react";
import ProductCard from "./SongCard";

const ProductsList = ({ data, onPlaySong }) => {
  return (
    <>
      {data?.map((item, index) => (
        <ProductCard item={item} key={item.id || index} onPlaySong={onPlaySong} />
      ))}
    </>
  );
};

export default ProductsList;
