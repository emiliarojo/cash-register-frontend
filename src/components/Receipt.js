import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Receipt = ({ receiptDetails }) => {
  const formatDate = (date) => {
    const padNumber = (num) => (num < 10 ? '0' + num : num);
    const year = date.getFullYear();
    const month = padNumber(date.getMonth() + 1);
    const day = padNumber(date.getDate());
    const hours = padNumber(date.getHours());
    const minutes = padNumber(date.getMinutes());

    return `${year}-${month}-${day}   ${hours}:${minutes}`;
  };
  const currentDate = formatDate(new Date());

  return (
    <div className="receipt">
      <div className="receipt-close" onClick={() => window.location.reload()}>
          <FontAwesomeIcon icon={faXmark} />
      </div>
      <div className="receipt-details">
        <div>
          <h1 className="header">Receipt</h1>
          <br />
          <p className="text-sm">{currentDate}</p>
        </div>
        <div className="receipt-items">
          <div className="receipt-labels text">
            <span>Item</span>
            <span>Qt.</span>
            <span>Price</span>
          </div>
          {receiptDetails.items.map((item) => (
            <div key={item.product_id} className="receipt-item text">
                <span>{item.product_name}</span>
                <span>x{item.quantity}</span>
                <span>€{item.total_price}</span>
            </div>
          ))}
        </div>
        <div className="receipt-total text">
            <span>Total:</span>
            <span>€{receiptDetails.total}</span>
        </div>
        {(receiptDetails.discounts.length > 0) && (
          <div className="receipt-discounts text">
            <strong>Discounts:</strong>
            {receiptDetails.discounts.map((discount) => (<p className="receipt-discount text-sm">{discount}</p>))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Receipt;
