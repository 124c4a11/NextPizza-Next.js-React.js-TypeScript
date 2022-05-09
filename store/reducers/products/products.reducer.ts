import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { IPizza } from '@/interfaces/IPizza';
import { IFilter } from '@/interfaces/IFilter';


interface ProductsState {
  products: IPizza[];
  pending: boolean;
  error: string | null;
}


const initialState: ProductsState = {
  products: [],
  pending: false,
  error: null,
};


const productsSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {
    productsFetchRequest(state, action: PayloadAction<IFilter | undefined>) {
      state.pending = true;
    },
    productsFetchSuccess(state, action: PayloadAction<IPizza[]>) {
      state.pending = false;
      state.products = action.payload;
    },
    productsFetchFailure(state, action: PayloadAction<string>) {
      state.pending = false;
      state.error = action.payload;
    }
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (state.products.length) return;

      const { products, pending, error }: ProductsState = action.payload.products;

      if (!products && !error) return state;

      return { products, pending, error };
    }
  },
});


export const {
  productsFetchRequest,
  productsFetchFailure,
  productsFetchSuccess
} = productsSlice.actions;


export default productsSlice.reducer;
