import React, { useState, useEffect } from 'react';
import Basket from './components/Basket';
import Summary from './components/Summary';
import CheckoutButton from './components/CheckoutButton';
import { getProducts, createBasket, getBasketItems, addItemToBasket, removeItemFromBasket,updateItemInBasket, checkoutBasket } from './services/apiService';

const App = () => {
  const [products, setProducts] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const [basketId, setBasketId] = useState(null);

  useEffect(() => {
    // Initialize the app by creating or retrieving a basket and fetching products
    const initializeApp = async () => {
      try {
        const basket = await createBasket();
        setBasketId(basket.basket_id);

        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);

        const fetchedItems = await getBasketItems(basket.basket_id);
        setBasketItems(fetchedItems);
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };

    initializeApp();

  }, []);

  const handleQuantityChange = async (productId, change) => {
    console.log("Basket ID:", basketId);
    try {
      const existingItem = basketItems.find(item => item.product_id === productId);
      const newQuantity = (existingItem ? existingItem.quantity : 0) + change;

      if (!existingItem && newQuantity > 0)
      {
        await addItemToBasket(basketId, productId, newQuantity);
      }
      else if (existingItem && newQuantity <= 0)
      {
        await removeItemFromBasket(basketId, existingItem.id);
      }
      else if (existingItem && newQuantity > 0)
      {
        await updateItemInBasket(basketId, existingItem.id, newQuantity);
      }
      else
      {
        console.error('Unexpected scenario: Unable to handle basket item.');
      }

      const updatedItems = await getBasketItems(basketId);
      setBasketItems(updatedItems);
    } catch (error) {
      console.error('Error updating basket:', error);
    }
  };


  const handleCheckout = async () => {
    try {
      const result = await checkoutBasket(basketId);
      console.log('Checkout result:', result);
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="app">
      <div className="container-basket">
        <div className="card-basket">
          <Basket products={products} basketItems={basketItems} onQuantityChange={handleQuantityChange} />
          <CheckoutButton onCheckout={handleCheckout} />
        </div>
      </div>
      <div className="container-summary">
        <Summary products={products} basketItems={basketItems} />
      </div>
    </div>
  );
};

export default App;
