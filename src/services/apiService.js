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

    // Check if response status indicates no content
    if (response.status === 204 || response.headers.get("Content-Length") === "0") {
      return null; // Return null to signify no content
    }

    return await response.json();
  } catch (error) {
    console.error(`Error during ${method.toLowerCase()} ${endpoint}:`, error);
    throw error;
  }
};

// Fetch products from the API
const getProducts = () => apiRequest('products');

// Create a new basket
const createBasket = () => apiRequest('baskets', { method: 'POST' });

// Fetch items from a specific basket
const getBasketItems = async (basketId) => apiRequest(`baskets/${basketId}/basket_items`);

// Add, update, or remove an item in the basket based on its quantity
const addItemToBasket = async (basketId, productId, quantity) => {
  const basketItems = await getBasketItems(basketId);
  const existingItem = basketItems.find(item => item.product_id === productId);

  if (existingItem) {
    if (quantity > 0) {
      // Update the existing item's quantity
      return apiRequest(`baskets/${basketId}/basket_items/${existingItem.id}`, {
        method: 'PUT',
        body: { quantity },
      });
    } else {
      // Remove the item if its quantity is zero
      return apiRequest(`baskets/${basketId}/basket_items/${existingItem.id}`, {
        method: 'DELETE',
      });
    }
  } else if (quantity > 0) {
    // Create a new item if none exists and quantity > 0
    return apiRequest(`baskets/${basketId}/basket_items`, {
      method: 'POST',
      body: { product_id: productId, quantity },
    });
  }
};

// Update the quantity of an item in the basket
const updateItemInBasket = async (basketId, basketItemId, quantity) => apiRequest(`baskets/${basketId}/basket_items/${basketItemId}`, {
  method: 'PUT',
  body: { quantity },
});

// Remove an item from the basket
const removeItemFromBasket = async (basketId, basketItemId) => apiRequest(`baskets/${basketId}/basket_items/${basketItemId}`, {
  method: 'DELETE',
});

// Checkout a basket
const checkoutBasket = (basketId) => apiRequest(`baskets/${basketId}/checkout`, { method: 'POST' });

export { getProducts, createBasket, getBasketItems, addItemToBasket, updateItemInBasket, removeItemFromBasket, checkoutBasket };
