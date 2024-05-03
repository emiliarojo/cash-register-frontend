import { getProducts, createBasket, getBasketItems, addItemToBasket, updateItemInBasket, removeItemFromBasket, checkoutBasket } from './apiService';

global.fetch = jest.fn();

describe('API Functions', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('getProducts makes a GET request to the correct endpoint', async () => {
    const mockResponse = [{ id: 1, name: 'Green Tea', price: 3.50 }, { id: 2, name: 'Strawberries', price: 5.00 }];
    fetch.mockResolvedValueOnce({
      ok: true,
      headers: {
        get: (name) => name === "Content-Length" ? "10" : null,
      },
      json: () => Promise.resolve(mockResponse),
    });

    const products = await getProducts();

    expect(fetch).toHaveBeenCalledWith('https://cash-register-api-fd7bc2ac94d6.herokuapp.com/products', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    expect(products).toEqual(mockResponse);
  });

  test('createBasket makes a POST request to the correct endpoint', async () => {
    const mockResponse = { basket_id: 1, session_id: 'test_session' };
    fetch.mockResolvedValueOnce({
      ok: true,
      headers: {
        get: (name) => name === "Content-Length" ? "10" : null,
      },
      json: () => Promise.resolve(mockResponse),
    });

    const basket = await createBasket();

    expect(fetch).toHaveBeenCalledWith('https://cash-register-api-fd7bc2ac94d6.herokuapp.com/baskets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    expect(basket).toEqual(mockResponse);
  });

  test('getBasketItems makes a GET request to the correct endpoint', async () => {
    const mockResponse = [
      { id: 1, product_id: 1, quantity: 2, discount_price: 3.50, paid_quantity: 1 },
      { id: 2, product_id: 2, quantity: 3, discount_price: 4.50, paid_quantity: 3 },
    ];
    const basketId = 1;

    fetch.mockResolvedValueOnce({
      ok: true,
      headers: {
        get: (name) => name === "Content-Length" ? "10" : null,
      },
      json: () => Promise.resolve(mockResponse),
    });

    const basketItems = await getBasketItems(basketId);

    expect(fetch).toHaveBeenCalledWith(`https://cash-register-api-fd7bc2ac94d6.herokuapp.com/baskets/${basketId}/basket_items`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    expect(basketItems).toEqual(mockResponse);
  });

  test('addItemToBasket adds an item, updates an existing item, or removes an item', async () => {
    const basketId = 1;
    const productId = 1;
    const quantity = 2;

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([{ id: 1, product_id: productId, quantity: 1 }]),
      headers: {
        get: jest.fn(() => "10"),
      },
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 1, product_id: productId, quantity }),
      headers: {
        get: jest.fn(() => "10"),
      },
    });

    await addItemToBasket(basketId, productId, quantity);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenLastCalledWith(
      expect.stringContaining(`baskets/${basketId}/basket_items/`),
      expect.objectContaining({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
        credentials: 'include',
      }),
    );
  });



  test('updateItemInBasket makes a PUT request to update an item', async () => {
    const basketId = 1;
    const basketItemId = 1;
    const quantity = 3;
    const mockResponse = { id: basketItemId, product_id: 1, quantity: quantity };

    fetch.mockResolvedValueOnce({
      ok: true,
      headers: {
        get: (name) => name === "Content-Length" ? "10" : null,
      },
      json: () => Promise.resolve(mockResponse),
    });

    await updateItemInBasket(basketId, basketItemId, quantity);

    expect(fetch).toHaveBeenCalledWith(`https://cash-register-api-fd7bc2ac94d6.herokuapp.com/baskets/${basketId}/basket_items/${basketItemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
      credentials: 'include',
    });
  });

  test('removeItemFromBasket makes a DELETE request', async () => {
    const basketId = 1;
    const basketItemId = 2;

    fetch.mockResolvedValueOnce({
      ok: true,
      headers: {
        get: (name) => name === "Content-Length" ? "10" : null,
      },
      json: () => Promise.resolve({}),
    });

    await removeItemFromBasket(basketId, basketItemId);

    expect(fetch).toHaveBeenCalledWith(`https://cash-register-api-fd7bc2ac94d6.herokuapp.com/baskets/${basketId}/basket_items/${basketItemId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  });

  test('checkoutBasket makes a POST request for checkout', async () => {
    const basketId = 1;
    const mockResponse = { total: 20.0, items: [], discounts: [] };

    fetch.mockResolvedValueOnce({
      ok: true,
      headers: {
        get: (name) => name === "Content-Length" ? "10" : null,
      },
      json: () => Promise.resolve(mockResponse),
    });

    const result = await checkoutBasket(basketId);

    expect(fetch).toHaveBeenCalledWith(`https://cash-register-api-fd7bc2ac94d6.herokuapp.com/baskets/${basketId}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    expect(result).toEqual(mockResponse);
  });

  afterEach(() => {
    fetch.mockClear();
    jest.clearAllTimers();
  });
});
