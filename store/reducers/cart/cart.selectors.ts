import { createSelector } from '@reduxjs/toolkit';
import { RootReducer } from 'store'


export const getCart = (state: RootReducer) => state.cart;


export const getProductsFromCart = (state: RootReducer) => state.cart.products;


export const getProductsFromCartById = (id: number) => createSelector(
  getProductsFromCart,
  (products) => products.filter((product) => product.id === id)
);


export const getProductTotalQuantityById = (id: number) => createSelector(
  getProductsFromCartById(id),
  (products) => {
    return products.reduce((acc, product) => {
      return acc += product.quantity
    }, 0);
  }
);
