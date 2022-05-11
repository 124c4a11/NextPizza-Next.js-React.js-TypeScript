import { CartTable } from 'components';

import { getCart } from 'store/reducers/cart/cart.selectors';
import { useAppSelector } from 'hooks/redux.hooks';


export function Cart(): JSX.Element {
  const { products, quantity, totalPrice } = useAppSelector(getCart);

  return (
    <>
      {
        products.length
          ?
          <CartTable products={products} />
          :
          <h3>Корзина пуста</h3>
      }
    </>
  )
}
