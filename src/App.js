import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList/ProductList';
import Summary from './components/Summary/Summary';
import CheckoutButton from './components/CheckoutButton/CheckoutButton';
import { getProducts, createBasket } from './services/apiService';
import './App.scss';

const App = () => {
  const [products, setProducts] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const [basketId, setBasketId] = useState(null);

  useEffect(() => {
    // Fetch products from API and set them to state
    getProducts()
      .then(setProducts)
      .catch((error) => {
        console.error('Failed to fetch products:', error);
      });

    // Create a new basket
    createBasket()
      .then((basket) => {
        setBasketId(basket.id);
        console.log('Basket created:', basket);
      })
      .catch((error) => {
        console.error('Failed to create basket:', error);
      });
  }, []);

  const handleQuantityChange = (productId, change) => {
  };

  const handleCheckout = () => {
  };

  return (
    <div className="app">
      <ProductList products={products} onQuantityChange={handleQuantityChange} />
      <Summary basketItems={basketItems} />
      <CheckoutButton onCheckout={handleCheckout} />
    </div>
  );
};

export default App;
