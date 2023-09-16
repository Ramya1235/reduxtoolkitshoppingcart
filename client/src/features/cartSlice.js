// Import necessary functions and components
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Define the initial state for the cart slice
const initialState = {
  cartItems: localStorage.getItem("cartItems") // Check if cartItems are stored in local storage
    ? JSON.parse(localStorage.getItem("cartItems")) // If yes, parse and retrieve them
    : [], // Otherwise, set an empty array
  cartTotalQuantity: 0, // Initialize total quantity to 0
  cartTotalAmount: 0, // Initialize total amount to 0
};

// Create a Redux slice for the shopping cart
export const cartSlice = createSlice({
  name: "cart", // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Define reducer functions

    // Add an item to the cart
    addToCart: (state, action) => {
      // Define the addToCart reducer function
      const itemIndex = state.cartItems.findIndex(
        // Find the index of the item in the cart
        (item) => item.id === action.payload.id // Using the item's ID from the action payload
      );
      if (itemIndex >= 0) {
        // Check if the item is already in the cart (itemIndex >= 0)
        state.cartItems[itemIndex].cartQuantity += 1; // Increase the item's cartQuantity by 1

        // Display a toast notification for increasing product quantity
        toast.info(`Increased ${state.cartItems[itemIndex].name} quantity`, {
          position: "bottom-left",
        });
      } else {
        // If the item is not in the cart
        const tempProduct = { ...action.payload, cartQuantity: 1 }; // Create a temporary product object with a cartQuantity of 1
        state.cartItems.push(tempProduct); // Add the temporary product to the cart

        // Display a toast notification for adding a product to the cart
        toast.success(`${action.payload.name} added to cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Store updated cart items in local storage
    },

    // Remove an item from the cart
    removeFromCart: (state, action) => {
      // Define the removeFromCart reducer function
      const nextCartItems = state.cartItems.filter(
        // Create a new array (nextCartItems) containing items that should remain in the cart
        (cartItem) => cartItem.id !== action.payload.id // Filter out the item with the specified ID from the action payload
      );
      state.cartItems = nextCartItems; // Update the cart items with the filtered array

      // Display a toast notification for removing a product from the cart
      toast.error(` ${action.payload.name} removed from cart`, {
        position: "bottom-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Store updated cart items in local storage
    },

    // Decrease the quantity of an item in the cart
    decreaseCart: (state, action) => {
      // Define the decreaseCart reducer function
      const itemIndex = state.cartItems.findIndex(
        // Find the index of the item in the cart
        (item) => item.id === action.payload.id // Using the item's ID from the action payload
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        // Check if the item's cartQuantity is greater than 1
        state.cartItems[itemIndex].cartQuantity -= 1; // Decrease the item's cartQuantity by 1

        // Display a toast notification for decreasing product quantity
        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        // If the item's cartQuantity is 1
        const nextCartItems = state.cartItems.filter(
          // Create a new array (nextCartItems) containing items that should remain in the cart
          (item) => item.id !== action.payload.id // Filter out the item with the specified ID from the action payload
        );
        state.cartItems = nextCartItems; // Update the cart items with the filtered array

        // Display a toast notification for removing a product from the cart
        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Store updated cart items in local storage
    },

    // Clear the entire cart
    clearCart: (state, action) => {
      state.cartItems = [];

      // Display a toast notification for clearing the cart
      toast.error("Cart cleared", { position: "bottom-left" });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Clear cart items in local storage
    },

    // Calculate and update cart totals
    getTotals: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      // Round the total to two decimal places
      total = parseFloat(total.toFixed(2));

      // Update cart state with calculated total and quantity
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

// Export individual actions and the reducer
export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer; // Export the reducer
