const API_BASE_URL = 'https://cash-register-api-fd7bc2ac94d6.herokuapp.com';

// Helper function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
  const { method = 'GET', headers = {}, body } = options;

  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to ${method.toLowerCase()} ${endpoint}.`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error during ${method.toLowerCase()} ${endpoint}:`, error);
    throw error;
  }
};

const getProducts = () => apiRequest('products');

const createBasket = () => apiRequest('baskets', { method: 'POST' });

const addItemToBasket = (basketId, productId, quantity) => apiRequest(`baskets/${basketId}/basket_items`, {
  method: 'POST',
  body: { product_id: productId, quantity },
});

const updateItemInBasket = (basketId, basketItemId, quantity) => apiRequest(`baskets/${basketId}/basket_items/${basketItemId}`, {
  method: 'PUT',
  body: { quantity },
});

const removeItemFromBasket = (basketId, basketItemId) => apiRequest(`baskets/${basketId}/basket_items/${basketItemId}`, {
  method: 'DELETE',
});

const checkoutBasket = (basketId) => apiRequest(`baskets/${basketId}/checkout`, {
  method: 'POST',
});

export { getProducts, createBasket, addItemToBasket, updateItemInBasket, removeItemFromBasket, checkoutBasket };
