// src/components/ProductItem.js
import React from 'react';

const ProductItem = ({ product, onQuantityChange }) => {
  return (
    <div className="product-item">
      <span className="product-name">{product.name}</span>
      <div className="quantity-controls">
        <button onClick={() => onQuantityChange(product.id, -1)}>-</button>
        <span className="quantity">{product.quantity}</span>
        <button onClick={() => onQuantityChange(product.id, 1)}>+</button>
      </div>
    </div>
  );
};

export default ProductItem;
