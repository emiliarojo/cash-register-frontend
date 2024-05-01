import React from 'react';
import Product from './Product';

const Basket = ({ products, basketItems, onQuantityChange }) => {
  const getBasketItem = (product, basketItems) => basketItems.find(item => item.product_id === product.id);

  return (
    <div className="card-basket-items">
      <h1 className="header">Items</h1>
      <div className="product-list">
        {products.map((product) => (
          <Product key={product.id} product={product} basketItem={ getBasketItem(product, basketItems) } onQuantityChange={onQuantityChange} />
        ))}
      </div>
    </div>
  );
};

export default Basket;
