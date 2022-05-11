import { ICart } from '../interfaces/ICart';


const storageName: string = 'next-pizza';


export function saveCartToLocalStorage(cart: ICart) {
  if (!cart.products.length) return;

  localStorage.setItem(storageName, JSON.stringify(cart));
}


export function getCartFromLocalStorage(): ICart | null {
  const cart: string | null = localStorage.getItem(storageName);

  if (!cart) return null;

  return JSON.parse(cart);
}


export function removeCartFromLocalStorage() {
  localStorage.removeItem(storageName);
}
