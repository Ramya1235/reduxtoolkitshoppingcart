import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  addToCart,
  decreaseCart,
  clearCart,
  getTotals,
} from "../features/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  // Get the cart state from Redux store
  const cart = useSelector((state) => state.cart);

  // Initialize the Redux dispatch function
  const dispatch = useDispatch();

  // Use the useEffect hook to dispatch a "getTotals" action whenever the cart or dispatch function changes
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Function to handle clearing the entire cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Function to handle removing a specific item from the cart
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  // Function to handle decreasing the quantity of a specific item in the cart
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };

  return (
    <div className="container">
      <h2 className="text-center mt-3">Shopping Cart</h2>

      {cart.cartItems.length === 0 ? (
        // Display a message when the cart is empty
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div>
            <Link to="/" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        // Display the cart items when the cart is not empty
        <div>
          <div className="row titles">
            <div className="col-md-3 col-6">
              <h3>Product</h3>
            </div>
            <div className="col-md-3 col-6">
              <h3>Price</h3>
            </div>
            <div className="col-md-3 col-6">
              <h3>Quantity</h3>
            </div>
            <div className="col-md-3 col-6">
              <h3>Total</h3>
            </div>
          </div>

          <div className="cart-items">
            {cart.cartItems.map((cartItem) => (
              // Display each item in the cart
              <div className="cart-item row" key={cartItem.id}>
                <div className="cart-product col-md-3 col-6">
                  <img src={cartItem.image} alt={cartItem.name} />
                  <div>
                    <h3>{cartItem.name}</h3>
                    <p>{cartItem.desc}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromCart(cartItem)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="cart-product-price col-md-3 col-6">
                  ${cartItem.price}
                </div>

                <div className="cart-product-quantity col-md-3 col-6">
                  <button
                    className="btn btn-light text-balck"
                    onClick={() => handleDecreaseCart(cartItem)}
                  >
                    -
                  </button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button
                    className="btn btn-light  text-balck"
                    onClick={() => handleAddToCart(cartItem)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-product-total-price col-md-3 col-6">
                  ${cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            {/* Button to clear the entire cart */}
            <button
              className="btn btn-danger clear-btn"
              onClick={() => handleClearCart()}
            >
              Clear Cart
            </button>

            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cart.cartTotalAmount}</span>
              </div>

              <p>Taxes and shipping calculated at checkout</p>

              {/* Button to proceed to checkout */}
              <button className="btn btn-primary">Check out</button>

              <div className="continue-shopping">
                <Link to="/" className="btn btn-secondary">
                  <i className="bi bi-arrow-left"></i> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
