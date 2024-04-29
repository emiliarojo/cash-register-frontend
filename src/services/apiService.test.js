import { getProducts, createBasket, addItemToBasket, updateItemInBasket, removeItemFromBasket, checkoutBasket } from './apiService';

global.fetch = jest.fn();
const API_BASE_URL = 'https://cash-register-api-fd7bc2ac94d6.herokuapp.com';


describe('apiService', () => {
  afterEach(() => {
    fetch.mockClear(); // Clear mock data after each test
  });

  test('getProducts should fetch products successfully', async () => {
    const mockProducts = [{ id: 1, name: "Green Tea" }, { id: 2, name: "Starwberries" }, { id: 3, name: "Coffee" }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });

    const products = await getProducts();

    expect(products).toEqual(mockProducts);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/products`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  });

  test('createBasket should create a basket successfully', async () => {
    const mockBasket = { basket_id: 1, session_id: "test_session" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockBasket),
    });

    const basket = await createBasket();

    expect(basket).toEqual(mockBasket);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/baskets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  });

  test('addItemToBasket should add an item successfully', async () => {
    const basketId = 1;
    const productId = 1;
    const quantity = 2;
    const mockResponse = { success: true };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const response = await addItemToBasket(basketId, productId, quantity);

    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/baskets/${basketId}/basket_items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, quantity }),
      credentials: 'include',
    });
  });

  test('updateItemInBasket should update an item successfully', async () => {
    const basketId = 1;
    const basketItemId = 1;
    const quantity = 3;
    const mockResponse = { success: true };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const response = await updateItemInBasket(basketId, basketItemId, quantity);

    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/baskets/${basketId}/basket_items/${basketItemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
      credentials: 'include',
    });
  });

  test('removeItemFromBasket should remove an item successfully', async () => {
    const basketId = 1;
    const basketItemId = 1;
    const mockResponse = { success: true };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const response = await removeItemFromBasket(basketId, basketItemId);

    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/baskets/${basketId}/basket_items/${basketItemId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  });

  test('checkoutBasket should checkout the basket successfully', async () => {
    const basketId = 1;
    const mockResponse = { total: 20.0, items: [], discounts: [] };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const response = await checkoutBasket(basketId);

    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/baskets/${basketId}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  });
});
