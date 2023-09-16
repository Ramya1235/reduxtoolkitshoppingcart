import productsReducer, { productsFetch } from "./features/productSlice";
import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./features/productsApi";
import cartReducer from "./features/cartSlice";

// Create the Redux store using configureStore
export const store = configureStore({
  reducer: {
    // Define reducers for different parts of the state
    products: productsReducer, // Products reducer
    [productsApi.reducerPath]: productsApi.reducer, // API slice reducer
    cart: cartReducer, // Cart reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware), // Add API middleware
});

// Dispatch an initial action to fetch products
store.dispatch(productsFetch());

export default store; // Export the Redux store
