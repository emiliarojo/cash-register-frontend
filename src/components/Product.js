import React from 'react';

const Product = ({ product, basketItem, onQuantityChange }) => {
  return (
    <div className="product-item">
      <span className="product-name">{product.name}</span>
      <div className="quantity-controls">
        <button onClick={() => onQuantityChange(product.id, -1)}  disabled={ basketItem ? basketItem.quantity <= 0 : true } >-</button>
        <span className="quantity">{basketItem ? basketItem.quantity : 0}</span>
        <button onClick={() => onQuantityChange(product.id, 1)}>+</button>
      </div>
    </div>
  );
};

export default Product;
