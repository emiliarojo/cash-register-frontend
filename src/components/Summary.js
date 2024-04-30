import React from 'react';

const Summary = ({ products, basketItems }) => {
  const calculateTotal = () => {
    return basketItems.reduce((acc, item) => acc + (item.paid_quantity * parseFloat(item.discount_price || 0)), 0);
  };

  const getProductName = (products, itemProductId) => {
    const product = products.find(p => p.id === itemProductId);
    return product ? product.name : '';
  };

  return (
    <div className="summary">
      {basketItems.map((item) => (
        <div key={item.product_id} className="summary-item">
          <span>{item.quantity} x {getProductName(products, item.product_id)}</span>
          <span>{(item.paid_quantity * parseFloat(item.discount_price)).toFixed(2)}</span>
        </div>
      ))}

      <div className="summary-total">
        <strong>Total:</strong> {calculateTotal().toFixed(2)}
      </div>
    </div>
  );
};

export default Summary;
