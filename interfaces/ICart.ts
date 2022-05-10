import { ICartProduct } from './ICartProduct';


export interface ICart {
  products: ICartProduct[],
  quantity: number;
  totalPrice: number;
}
