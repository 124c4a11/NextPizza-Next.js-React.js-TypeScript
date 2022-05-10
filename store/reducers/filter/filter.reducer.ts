import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFilter } from 'interfaces/IFilter';

import { categories } from 'utils/static-data';


const initialState: IFilter = {
  category: categories[0],
  sortBy: 'price',
}


const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<IFilter['category']>) {
      state.category = action.payload;
    },

    setSortBy(state, action: PayloadAction<IFilter['sortBy']>) {
      state.sortBy = action.payload;
    },
  }
});


export const { setCategory, setSortBy } = filterSlice.actions;


export default filterSlice.reducer;
