import { RootReducer } from '../..';


export const getFilter = (state: RootReducer) => state.filter;


export const getCategory = (state: RootReducer) => state.filter.category;
