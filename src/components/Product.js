import React from 'react';

const Product = ({ product, basketItem, onQuantityChange }) => {
  const emojis = {
    "Green Tea": "\u{1F375}",
    "Strawberries": "\u{1F353}",
    "Coffee": "\u2615",
  };

  return (
    <div className="product-item">
      <span className="product-name text">{emojis[product.name]} {product.name}</span>
      <div className="quantity-controls">
        <button className="btn-quantity" onClick={() => onQuantityChange(product.id, -1)} disabled={basketItem ? basketItem.quantity <= 0 : true}>-</button>
        <span className="quantity text">{basketItem ? basketItem.quantity : 0}</span>
        <button className="btn-quantity" onClick={() => onQuantityChange(product.id, 1)}>+</button>
      </div>
    </div>
  );
};

export default Product;
