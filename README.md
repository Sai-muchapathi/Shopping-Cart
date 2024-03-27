The Shopping cart is my personal project which is built using React JS. I have developed this project to implement some of the react concepts to gets hands on.
# React Application

## Overview
This is a React application that serves as a basic e-commerce platform. It allows users to browse products, add them to their cart, and view their cart contents. Additionally, it provides an admin dashboard for managing users and products.

## Installation
1. Clone the repository:
    ```bash
    git clone <repository_url>
    cd project-directory
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Usage
To start the development server and run the application, use the following command:
```bash
npm start
```
Open your browser and navigate to `http://localhost:3000` to view the application.

## File Structure
```
/src
  |-- /components
        |-- Home.js
        |-- About.js
        |-- Careers.js
        |-- Login.js
        |-- SignUp.js
        |-- AdminDashboard.js
        |-- AdminLogin.js
        |-- Cart.js
        |-- Users.js
  |-- /assets
        |-- Logo.png
  |-- App.js
  |-- ProductProvider.js
```

## Components
**Home**: Displays the main page of the e-commerce store with a list of products.
**About**: Provides information about the company or the store.
**Careers**: Displays career opportunities available at the company.
**Login**: Allows users to log in to their account.
**SignUp**: Allows users to sign up for a new account.
**AdminDashboard**: Dashboard for administrators to manage the store.
**AdminLogin**: Login page for administrators.
**Cart**: Displays the items added to the cart and allows users to adjust quantities.
**Users**: Displays a list of users (admin feature).
**ProductProvider**: Context provider for managing product and user state throughout the application.

## Dependencies
- React
- React Router

## React Concepts Used
- **Functional Components**: All components in this project are functional components, utilizing React hooks for managing state and side effects.
  
- **React Router**: Used for declarative routing within the application, enabling navigation between different pages/components without a full page reload.

- **State Management**: State is managed using the `useState` hook from React, allowing components to maintain and update their own state.

- **Context API**: The application uses the Context API for managing global state related to products, allowing components to access and update this state without prop drilling.

- **Lifecycle Methods**: The `useEffect` hook is used for managing side effects, such as fetching data from an API or setting up subscriptions. 

- **Conditional Rendering**: Conditional rendering is used to display different components or UI elements based on certain conditions, such as whether a user is logged in or if data is still loading.

- **Memoization**: The useMemo hook is used to memoize the products list, ensuring that it is only recalculated when its dependencies (products, selectedProduct, dispatch) change.

- **Suspense**: The Suspense component is used to handle asynchronous loading of the product list, displaying a loading indicator while the data is being fetched.

- **Event Handling**: Event handlers are used to handle user interactions such as increasing or decreasing the quantity of items in the cart.

- **Effects**: The useEffect hook is used to fetch data from external APIs when the component mounts. It ensures that data is fetched only once when the component mounts.

##  React Hooks Used
**useState**: Used to manage local component state.
**useReducer**: Utilized for managing complex state logic with actions and reducers.
**useEffect**: Employed for performing side effects such as data fetching when components mount.
**useMemo**: Utilized to memoize expensive calculations and optimize performance.
**useCallback**: Used to memoize event handler functions and prevent unnecessary re-renders.
**useContext**: Utilized to consume the context values provided by the ProductProvider.
**useRef**: Employed to maintain a reference to a value across renders.


## Here's a breakdown of the components usage:

1. **App.js**:
   - Utilizes React Router (`BrowserRouter`, `Link`, `Routes`, `Route`, `Navigate`) for client-side routing.
   - Implements state management using `useState` for managing `userName` and `location`.
   - Utilizes `useCallback` to memoize the `Navbar` component.
   - Utilizes `useEffect` to fetch geolocation data (`getCurrentPosition`).
   - Consumes context values using `useContext`.

2. **Home.js**:
   - Utilizes `useProductContext` hook to consume context values.
   - Implements state management using `useState` for managing `selectedProduct`.
   - Utilizes `useMemo` to memoize the `productsList`.
   - Utilizes `useEffect` to simulate data fetching delay and updates `loading` state.

3. **Cart.js**:
   - Utilizes `useProductContext` hook to consume context values.
   - Implements event handlers (`handleMinus`, `handlePlus`) using `useState` and `useReducer`.
   - Utilizes `useEffect` to update total price (`SET_TOTAL`) when cart items change.

4. **ProductProvider.js**:
   - Implements state management using `useReducer` for managing `products`, `cart`, and `total`.
   - Utilizes `useEffect` to fetch products and users data asynchronously.
   - Uses `useContext` to provide context values to child components.

