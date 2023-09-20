import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listFavorite: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, { payload }: { payload: any }) => {
      const productIndex = state.listFavorite.findIndex(
        (product) => product.id === payload.data.id
      );
      if (productIndex === -1) {
        state.listFavorite.push(payload.data);
      }
    },
    deleteFavorite: (state, { payload }: { payload: any }) => {
      const productIndex = state.listFavorite.findIndex(
        (product) => product.id === payload.data.id
      );
      state.listFavorite.splice(productIndex, 1);
    },
  },
});

export const { addFavorite, deleteFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
