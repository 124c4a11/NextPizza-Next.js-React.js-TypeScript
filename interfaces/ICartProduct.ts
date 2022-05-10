import { IPizza } from './IPizza';


export interface ICartProduct extends Pick<IPizza, 'id' | 'imageUrl' | 'name' | 'price'> {
  type: number,
  size: number,
  quantity: number,
  totalPrice: number,
}
