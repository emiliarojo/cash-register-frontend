import React from 'react';

const CheckoutButton = ({ onCheckout }) => {
  return (
    <button className="btn-checkout text" onClick={onCheckout}>
      Checkout
    </button>
  );
};

export default CheckoutButton;
