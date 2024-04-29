import React from 'react';

const Summary = ({ basketItems }) => {
  const calculateTotal = () => {
    return basketItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
  };

  return (
    <div className="summary">
      {basketItems.map((item) => (
        <div key={item.product.id} className="summary-item">
          <span>{item.quantity} x {item.product.name}</span>
          <span>{(item.quantity * item.product.price).toFixed(2)}</span>
        </div>
      ))}
      <div className="summary-total">
        <strong>Total:</strong> {calculateTotal().toFixed(2)}
      </div>
    </div>
  );
};

export default Summary;
