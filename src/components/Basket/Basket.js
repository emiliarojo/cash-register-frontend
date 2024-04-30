import React from 'react';
import BasketItem from '../BasketItem/BasketItem';

const Basket = ({ products, onQuantityChange }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <BasketItem key={product.id} product={product} onQuantityChange={onQuantityChange} />
      ))}
    </div>
  );
};

export default Basket;
