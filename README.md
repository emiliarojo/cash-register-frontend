# Cash Register React App

This is a cash register frontend application built with React designed to integrate seamlessly with a backend API for managing baskets, products, and discounts. Users can add items to their baskets, adjust quantities, view summaries, and proceed to checkout where they get a receipt. The app is fully responsive and built mobile-first.

You can check it out by clicking on this [link](https://cash-register-frontend.vercel.app/).

## Features
- **Basket Management**: Create a new basket when visiting thee website, add or remove items, and update quantities.
- **Product Listing**: Fetch available products from the backend API. 🍵 🍓 ☕️
- **Summary**: View a detailed summary of the basket, including discounts and total.
- **Checkout**: Complete the basket checkout process.

## Requirements
- **Node.js** (v12 or newer)
- **npm** (or Yarn)

## Installation
1. Clone the repository:
  ```
    git clone <repository-url>
    cd <repository-directory>
  ```
2. Instal the dependencies:
  ```
    npm install
  ```

## Usage
1. Start the development server:
  ```
    npm start
  ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Development
### Folder Structure
- **public**: Contains static files, including the **index.html** entry point.
- **src**:
  - **assets**: Stores static images.
  - **components**: Holds reusable UI components, including **Basket**, **CheckoutButton**, **Product**, **Receipt**, and **Summary**.
  - **services**: Contains service functions included in **apiService.js** for interacting with the backend API.
  - **styles**:
    - **base**: Includes foundational styles like **_colors.scss**, **_reset.scss**, and **_typography.scss**.
    - **components**: Defines styles for individual components like **_basket.scss** and **_buttons.scss**.
- **App.js**: The main app component that brings together other components.

### Testing
- **services/apiService.test.js**: Contains tests mocking API requests to ensure they work as expected.

To run the tests:
  ```
    npm test
  ```

## Integration with Rails Backend
The app is configured to make API requests to a Rails backend hosted on Heroku. Requests are routed to [https://cash-register-api-fd7bc2ac94d6.herokuapp.com](https://cash-register-api-fd7bc2ac94d6.herokuapp.com), handling tasks such as basket management, product retrieval, and checkout. Keep in mind this link is just the root. Please read the [documentation](https://github.com/emiliarojo/cash-register-api) to understand how to make requests to this API.

## Screenshots
<img width="1437" alt="Screenshot 2024-05-01 at 01 57 34" src="https://github.com/emiliarojo/cash-register-frontend/assets/115421477/f4c1d950-0ac7-424e-a327-dfc0af2bc192">
<img width="1437" alt="Screenshot 2024-05-01 at 01 58 08" src="https://github.com/emiliarojo/cash-register-frontend/assets/115421477/f372ca4c-dfd4-4a8e-ac23-1733d1269aba">
<img width="282" alt="Screenshot 2024-05-01 at 02 03 02" src="https://github.com/emiliarojo/cash-register-frontend/assets/115421477/6ddede61-a60d-4e62-9fb3-c0695d58abb5">
<img width="282" alt="Screenshot 2024-05-01 at 02 03 32" src="https://github.com/emiliarojo/cash-register-frontend/assets/115421477/ad93f32d-ad17-4394-9f4e-ce22e2eef5f3">
<img width="282" alt="Screenshot 2024-05-01 at 02 04 21" src="https://github.com/emiliarojo/cash-register-frontend/assets/115421477/cbab8b8f-a8e5-47ed-b726-98955348b384">


