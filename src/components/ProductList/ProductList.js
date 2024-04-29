import React from 'react';
import ProductItem from '../ProductItem/ProductItem';

const ProductList = ({ products, onQuantityChange }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} onQuantityChange={onQuantityChange} />
      ))}
    </div>
  );
};

export default ProductList;
  