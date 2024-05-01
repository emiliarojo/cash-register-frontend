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
<img width="1439" alt="Screenshot 2024-05-01 at 02 15 32" src="https://github.com/emiliarojo/cash-register-frontend/assets/115421477/39264395-9496-40d4-a355-30f033e7ec0c">
<img width="1439" alt="Screenshot 2024-05-01 at 02 15 41" src="https://github.com/emiliarojo/cash-register-frontend/assets/115421477/a4c5c119-a916-407e-8b4a-6e80a4948167">
<img width="281" alt="Screenshot 2024-05-01 at 02 16 28" src="https://github.com/emiliarojo/cash-register-frontend/assets/115421477/60a9426a-a937-463d-a969-7e104b4f39f4">
<img width="281" alt="Screenshot 2024-05-01 at 02 16 45" src="https://github.com/emiliarojo/cash-register-frontend/assets/115421477/92862e4a-4596-44a0-8b18-e2fd80ae078f">
<img width="281" alt="Screenshot 2024-05-01 at 02 17 07" src="https://github.com/emiliarojo/cash-register-frontend/assets/115421477/31581507-7eed-4588-9b93-5daabffc7f0c">
<img width="281" alt="Screenshot 2024-05-01 at 02 17 14" src="https://github.com/emiliarojo/cash-register-frontend/assets/115421477/d779df1a-c8ab-493b-b744-7605e64b50e9">
