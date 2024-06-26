import React, { useState, useEffect } from 'react';
import Basket from './components/Basket';
import Summary from './components/Summary';
import CheckoutButton from './components/CheckoutButton';
import Receipt from './components/Receipt';
import { getProducts, createBasket, getBasketItems, addItemToBasket, removeItemFromBasket,updateItemInBasket, checkoutBasket } from './services/apiService';
import GBag1 from './assets/gbag1.png';
import GBag2 from './assets/gbag2.webp';

const App = () => {
  const [products, setProducts] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const [basketId, setBasketId] = useState(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState(null);

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
      setReceiptDetails(result);
      setCheckingOut(true);
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="app">
      <div className="container-basket">
        <div className="card-basket">
          <Basket products={products} basketItems={basketItems} onQuantityChange={handleQuantityChange} />
          <div className="container-btn-checkout">
            <CheckoutButton onCheckout={handleCheckout} basketItems={basketItems} />
          </div>
        </div>
      </div>
      <div className="container-summary">
        <Summary products={products} basketItems={basketItems} />
        <div className="container-stand">
          <div className="stand"></div>
        </div>
      </div>
      <div className="container-images">
        <img src={GBag2} alt="Grocery Bag Drawing" className="gbag2" />
        <img src={GBag1} alt="Grocery Bag Drawing" className="gbag1" />
      </div>
      {checkingOut && <div className="checkout-overlay"></div>}
      {checkingOut && (
        <div className="container-receipt">
          <Receipt receiptDetails={receiptDetails}/>
        </div>
      )}
    </div>
  );
};

export default App;
