/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  loading: false,
  total: 0,
  listItem: [],
};

const cartSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    actionRequest: (state) => {
      return {
        ...state,
        error: null,
        loading: true,
      };
    },
    getDataSuccess: (state, { payload }: { payload: any }) => {
      return {
        ...state,
        error: null,
        loading: false,
        ...payload,
      };
    },
    addToCart: (state, { payload }: { payload: any }) => {
      console.log(state);
      // console.log('payload', payload.data.price);
      const productIndex = state.listItem.findIndex(
        (product) =>
          product.data.id === payload.data.id &&
          product.selectedSize === payload.selectedSize
      );
      if (!state.listItem[productIndex]) {
        state.listItem.push({
          data: payload.data,
          quantity: 1,
          selectedSize: payload.selectedSize,
        });
        state.total += payload.data.price;
      } else {
        state.listItem[productIndex].quantity += 1;
        state.total += payload.data.price;
      }
    },
    deleteItemFromCart: (state, { payload }: { payload: any }) => {
      const productIndex = state.listItem.findIndex(
        (product) =>
          product.data.id === payload.data.id &&
          product.selectedSize === payload.selectedSize
      );

      state.listItem.splice(productIndex, 1);

      state.total -= payload.data.price * payload.quantity;
    },
    increaseItemFromCart: (state, { payload }: { payload: any }) => {
      const productIndex = state.listItem.findIndex(
        (product) =>
          product.data.id === payload.data.id &&
          product.selectedSize === payload.selectedSize
      );
      state.listItem[productIndex].quantity += 1;
      state.total += payload.data.price;
    },
    decreaseItemFromCart: (state, { payload }: { payload: any }) => {
      const productIndex = state.listItem.findIndex(
        (product) =>
          product.data.id === payload.data.id &&
          product.selectedSize === payload.selectedSize
      );
      if (state.listItem[productIndex].quantity === 1) {
        state.listItem.splice(productIndex, 1);
      } else {
        state.listItem[productIndex].quantity -= 1;
      }
      state.total -= payload.data.price;
    },
    reset: () => initialState,
  },
});

export const {
  actionRequest,
  getDataSuccess,
  reset,
  addToCart,
  deleteItemFromCart,
  increaseItemFromCart,
  decreaseItemFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;

//reducer, store, dispatch
