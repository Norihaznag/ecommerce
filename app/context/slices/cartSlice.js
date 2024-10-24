import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.find((item) => item.id === action.payload.id)
      if (itemExists) {
        itemExists.quantity++
      } else {
        state.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload)
    },
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload)
      item.quantity++
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload)
      if (item.quantity === 1) {
        return state.filter((item) => item.id !== action.payload)
      }
      item.quantity--
    },

    clearCart : (state,action) => {
      state.length = 0
    }
  },
})

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity , clearCart } = cartSlice.actions
export default cartSlice.reducer