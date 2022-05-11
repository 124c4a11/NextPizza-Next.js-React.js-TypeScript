import cn from 'classnames';
import { DetailedHTMLProps, TableHTMLAttributes } from 'react';

import styles from './CartTable.module.scss';

import { ICartProduct } from 'interfaces/ICartProduct';

import { CartTableItem } from 'components';

import { useAppSelector } from 'hooks/redux.hooks';
import { getProductsFromCart } from 'store/reducers/cart/cart.selectors';



interface CartTableProps extends DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> {
  products: ICartProduct[];
}


export function CartTable({
  className
}: CartTableProps): JSX.Element {
  const products = useAppSelector(getProductsFromCart);

  return (
    <table
      className={cn(
        styles['table'],
        className,
      )}
    >
      <tbody className={styles['table__body']}>
        {
          products.map((product) => (
            <CartTableItem key={`${product.id}${product.size}${product.type}`} product={product} />
          ))
        }
      </tbody>
    </table>
  );
}
