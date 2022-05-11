import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICart } from 'interfaces/ICart';
import { ICartProduct } from 'interfaces/ICartProduct';


const initialState: ICart = {
  products: [],
  quantity: 0,
  totalPrice: 0,
};


function findProductByOptions(
  products: ICartProduct[],
  product: ICartProduct
) {
  return products.find(({ id, type, size }) => {
    return id === product.id && type === product.type && size === product.size;
  });
}


function increaseProductTotalQuantityAndPrice(
  product: ICartProduct,
  price: number,
  quantity: number,
) {
  product.totalPrice = Number((product.totalPrice + price).toFixed(2));
  product.quantity += quantity;
}


function decreaseProductTotalQuantityAndPrice(
  product: ICartProduct,
  price: number,
  quantity: number,
) {
  product.totalPrice = Number((product.totalPrice - price).toFixed(2));
  product.quantity -= quantity;
}


function increaseCartTotalQuantityAndPrice(
  state: ICart,
  price: number,
  quantity: number,
) {
  state.totalPrice = Number((state.totalPrice + price).toFixed(2));
  state.quantity += quantity;
}


function decreaseCartTotalQuantityAndPrice(
  state: ICart,
  price: number,
  quantity: number,
) {
  state.totalPrice = Number((state.totalPrice - price).toFixed(2));
  state.quantity -= quantity;
}


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(_, action: PayloadAction<ICart>) {
      return action.payload;
    },

    addProductToCart(state, { payload: product }: PayloadAction<ICartProduct>) {
      const { products } = state;
      const findedProduct = findProductByOptions(products, product);

      if (findedProduct) {
        increaseProductTotalQuantityAndPrice(findedProduct, product.price, 1);
      } else {
        products.push(product);
      }

      increaseCartTotalQuantityAndPrice(state, product.price, 1);
    },

    decreaseProductQuantityInCart(state, { payload: product }: PayloadAction<ICartProduct>) {
      const { products } = state;
      const findedProduct = findProductByOptions(products, product);

      if (findedProduct && findedProduct.quantity > 1) {
        decreaseProductTotalQuantityAndPrice(findedProduct, product.price, 1);

        decreaseCartTotalQuantityAndPrice(state, product.price, 1);
      }
    },

    removeProductFromCart(state, { payload: product }: PayloadAction<ICartProduct>) {
      const { products } = state;

      let productTotalPrice = 0;
      let productQuantity = 0;

      const filteredProducts = products.filter(({ id, type, size, totalPrice, quantity }) => {
        if (id === product.id && type === product.type && size === product.size) {
          productTotalPrice = totalPrice;
          productQuantity = quantity;
        }

        return id !== product.id || type !== product.type || size !== product.size;
      });

      state.products = filteredProducts;

      decreaseCartTotalQuantityAndPrice(state, productTotalPrice, productQuantity);
    },

    clearCart() {
      return initialState;
    },
  }
});


export const {
  setCart,
  addProductToCart,
  decreaseProductQuantityInCart,
  removeProductFromCart,
  clearCart,
} = cartSlice.actions;


export default cartSlice.reducer;
