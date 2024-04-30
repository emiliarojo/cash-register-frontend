import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BasketItem from './BasketItem';

describe('BasketItem Component', () => {
  const basketItems = [
    { id: 1, name: 'Green Tea', quantity: 3 },
    { id: 2, name: 'Strawberries', quantity: 5 },
    { id: 3, name: 'Coffee', quantity: 2 },
  ];

  const setup = (product, onQuantityChange) => {
    render(<BasketItem product={product} onQuantityChange={onQuantityChange} />);

    const decrementButton = screen.getByText('-');
    const incrementButton = screen.getByText('+');
    const productName = screen.getByText(product.name);
    const quantity = screen.getByText(`${product.quantity}`);

    return { decrementButton, incrementButton, productName, quantity };
  };

  basketItems.forEach(product => {
    const mockOnQuantityChange = jest.fn();

    describe(`for product "${product.name}"`, () => {
      beforeEach(() => {
        setup(product, mockOnQuantityChange);
      });

      it('renders product information correctly', () => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
        expect(screen.getByText(`${product.quantity}`)).toBeInTheDocument();
      });

      it('calls onQuantityChange with correct arguments when the "-" button is clicked', () => {
        fireEvent.click(screen.getByText('-'));
        expect(mockOnQuantityChange).toHaveBeenCalledWith(product.id, -1);
      });

      it('calls onQuantityChange with correct arguments when the "+" button is clicked', () => {
        fireEvent.click(screen.getByText('+'));
        expect(mockOnQuantityChange).toHaveBeenCalledWith(product.id, 1);
      });
    });
  });
});
