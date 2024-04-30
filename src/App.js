import React, { useState, useEffect } from 'react';
import Basket from './components/Basket/Basket';
import Summary from './components/Summary/Summary';
import CheckoutButton from './components/CheckoutButton/CheckoutButton';
import { getProducts, createBasket } from './services/apiService';
import './App.scss';

const App = () => {
  const [products, setProducts] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const [basketId, setBasketId] = useState(null);

  useEffect(() => {
    // Create a new basket
    createBasket()
      .then((basket) => {
        setBasketId(basket.id);
        console.log('Basket created:', basket);
      })
      .catch((error) => {
        console.error('Failed to create basket:', error);
      });
    // Fetch products from API and set them to state
    getProducts()
      .then(setProducts)
      .catch((error) => {
        console.error('Failed to fetch products:', error);
      });

  }, []);

  const handleQuantityChange = (productId, change) => {

  };

  const handleCheckout = () => {

  };

  return (
    <div className="app">
      <Basket products={products} onQuantityChange={handleQuantityChange} />
      <Summary basketItems={basketItems} />
      <CheckoutButton onCheckout={handleCheckout} />
    </div>
  );
};

export default App;
