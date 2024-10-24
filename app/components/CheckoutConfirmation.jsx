import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../context/slices/cartSlice'; // Assuming you have this action in your cartSlice
import { useRouter } from 'next/navigation';

const CheckoutConfirmationButton = ({ setStep }) => {
  const router = useRouter(); 
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  const simulateApiCall = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, orderId: Math.floor(Math.random() * 1000000) });
      }, 2000); // Simulates a 2-second API call
    });
  };

  const handleConfirmOrder = async () => {
    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Show confirmation dialog
    const isConfirmed = window.confirm(
      `Are you sure you want to place this order for $${totalPrice.toFixed(2)}?\n\n` +
      `This will charge your payment method and initiate the shipping process.`
    );

    if (!isConfirmed) {
      return; // Exit if user cancels
    }

    setIsLoading(true);
    try {
      const result = await simulateApiCall();
      if (result.success) {
        dispatch(clearCart()); // Clear the cart after successful order
        setStep(3); // Move to the next step (order confirmed)
        alert(`Order confirmed! Your order ID is: ${result.orderId}`);
        router.push('/')
      } else {
        // Handle API call failure
        alert('Order confirmation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during order confirmation:', error);
      alert('An error occurred while processing your order. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleConfirmOrder}
      disabled={isLoading}
      className={`w-full font-bold py-2 px-4 rounded-md transition duration-300 ${
        isLoading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {isLoading ? 'Processing...' : 'Confirm Order'}
    </button>
  );
};

export default CheckoutConfirmationButton;