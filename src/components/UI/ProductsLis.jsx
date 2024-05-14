import React from "react";
import ProductCar from "./ProductCar";

const ProductsList = ({data}) => {
  return (
    <>
    {data?.map((item, index)=>(
        <ProductCar item={item} key={index}/>
    ))}
        
    </>
  );
};

export default ProductsList;