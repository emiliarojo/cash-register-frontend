// src/App.js
import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Summary from './components/Summary';
import CheckoutButton from './components/CheckoutButton';
import './App.scss'; // Assuming you use SASS

const App = () => {
  const [products, setProducts] = useState([]);
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    // Fetch the products from the API and set them to the products state
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://cash-register-api-fd7bc2ac94d6.herokuapp.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data.map(product => ({ ...product, quantity: 0 }))); // Adding quantity property for the UI
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchProducts();
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
