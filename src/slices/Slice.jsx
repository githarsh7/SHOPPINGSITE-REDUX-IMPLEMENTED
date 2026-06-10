import { createSlice } from "@reduxjs/toolkit";
import productsData from "../data/ProductsData.json";

const initialState = {
  products: productsData.products,
  addedProducts: [],
  productCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addProductToCart: (state, action) => {
      const product = action.payload;

      const exists = state.addedProducts.find(
        (item) => item.id === product.id
      );

      if (!exists) {
        state.addedProducts.push({
          ...product,
          quantity: 1,
        });

        state.productCount += 1;
      }
    },

    removeProductFromCart: (state, action) => {
      const id = action.payload;

      state.addedProducts = state.addedProducts.filter(
        (item) => item.id !== id
      );

      state.productCount = state.addedProducts.length;
    },

    updateProductQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const product = state.addedProducts.find(
        (item) => item.id === id
      );

      if (product) {
        product.quantity = Number(quantity);
      }
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;