import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';
import Link from 'next/link';

import styles from './Bag.module.scss';

import CartIcon from './cart.svg';


interface BagProps extends DetailedHTMLProps<HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> { }


export function Bag({
  className,
  ...props
}: BagProps): JSX.Element {
  const quantity = 10;
  const totalPrice = 10;

  return (
    <Link href="/cart">
      <a
        className={cn(
          styles['bag'],
          className
        )}
        {...props}
        aria-label={`Общая цена заказа: ${totalPrice} ₽. Количество товаров в корзине: ${quantity}. Перейти в корзину.`}
        title="Перейти в корзину."
      >
        <span className={styles['bag__text']}>{`${totalPrice} ₽`}</span>
        <span className={styles['bag__text']}><span>{quantity}</span><CartIcon /></span>
      </a>
    </Link>
  );
}
