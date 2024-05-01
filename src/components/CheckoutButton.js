import React from 'react';

const CheckoutButton = ({ onCheckout, basketItems }) => {
  return (
    <button className="btn-checkout text" onClick={onCheckout} disabled={basketItems.length > 0 ? false : true}>
      Checkout
    </button>
  );
};

export default CheckoutButton;
