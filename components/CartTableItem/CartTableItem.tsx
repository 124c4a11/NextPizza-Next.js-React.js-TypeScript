import { DetailedHTMLProps, HTMLAttributes, memo } from 'react';
import Image from 'next/image';

import styles from './CartTableItem.module.scss';

import RemoveIcon from './remove.svg';

import { ICartProduct } from 'interfaces/ICartProduct';

import { doughTypes } from 'utils/static-data';

import { Button, Counter } from 'components';

import { useAppDispatch } from 'hooks/redux.hooks';
import {
  addProductToCart,
  decreaseProductQuantityInCart,
  removeProductFromCart
} from 'store/reducers/cart/cart.reducer';


interface CartTableItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> {
  product: ICartProduct;
}


export const CartTableItem = memo(
  function CartTableItem({
    product
  }: CartTableItemProps): JSX.Element {
    const {
      imageUrl,
      name,
      type,
      size,
      quantity,
      totalPrice,
    } = product;

    const dispatch = useAppDispatch();

    function addToCart() {
      dispatch(addProductToCart(product));
    }

    function decreaseInCart() {
      if (product.quantity === 1) return;

      dispatch(decreaseProductQuantityInCart(product));
    }

    function removeFromCart() {
      const isAgree = window.confirm(`Вы действительно хотите удалить из корзины все пиццы ${name} ${doughTypes[type]} тесто, ${size} см?`);

      if (isAgree) dispatch(removeProductFromCart(product));
    }

    return (
      <tr className={styles['item']}>
        <td>
          <span className={styles['item__img']}>
            <Image
              src={imageUrl}
              width="80"
              height="80"
              alt={name}
              layout="responsive"
            />
          </span>
        </td>
        <td className={styles['item__body']}>
          <h3 className={styles['item__title']}>{name}</h3>
          <p className={styles['item__subtitle']}>
            {`${doughTypes[type]} тесто, ${size} см.`}
          </p>
        </td>
        <td>
          <Counter
            value={quantity}
            increment={addToCart}
            decrement={decreaseInCart}
            incrementAriaLabel={`Пицца: ${name}. ${doughTypes[type]} тесто, ${size} см. Kоличество в корзине ${quantity}. Увеличить количество товара в корзине на 1`}
            decrementAriaLabel={`Пицца: ${name}. ${doughTypes[type]} тесто, ${size} см. Количество в корзине ${quantity}. Уменьшить  количество товара в корзине на 1`}
          />
        </td>
        <td>
          <p className={styles['item__price']}>
            <span className="visually-hidden">Цена: </span>
            {`${totalPrice} ₽`}
          </p>
        </td>
        <td>
          <Button
            variant="outline-secondary"
            shape="circle"
            className={styles['item__button']}
            aria-label={`Пицца: ${name}. ${doughTypes[type]} тесто, ${size} см. Общая цена ${totalPrice} ₽. Удалить из корзины.`}
            onClick={removeFromCart}
          ><RemoveIcon /></Button>
        </td>
      </tr>
    );
  }
);
