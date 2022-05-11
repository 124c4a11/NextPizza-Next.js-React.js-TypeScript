import Link from 'next/link';

import styles from './Cart.module.scss';

import CartIcon from './icons/shopping-cart.svg';
import ArrowIcon from './icons/arrow.svg';
import TrashIcon from './icons/trash.svg';
import CartImage from './icons/cart-image.svg';

import { Button, CartTable, H } from 'components';

import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { clearCart } from 'store/reducers/cart/cart.reducer';
import { getCart } from 'store/reducers/cart/cart.selectors';

import { removeCartFromLocalStorage } from 'utils/cart-local-storage';


export function Cart(): JSX.Element {
  const { products, quantity, totalPrice } = useAppSelector(getCart);
  const dispatch = useAppDispatch();

  function onClearCart() {
    const isAgree = window.confirm('Вы действительно хотите очистить корзину?');

    if (!isAgree) return;

    dispatch(clearCart());

    removeCartFromLocalStorage();
  }

  function makeOrder() {
    window.alert('Спасибо за заказ! Ваш заказ обрабатывается.');

    dispatch(clearCart());

    removeCartFromLocalStorage();
  }

  return (
    <>
      {
        products.length
          ?
          <>
            <div className={styles['action-bar']}>
              <H component="h2"><CartIcon /><span>Корзина</span></H>
              <Button
                variant="text-secondary"
                shape="text"
                onClick={onClearCart}
              ><TrashIcon /><span>Очистить корзину</span></Button>
            </div>

            <CartTable products={products} />

            <div className={styles['action-bar']}>
              <p className={styles['text-total']}>Всего товаров: <b>{quantity} шт.</b></p>
              <p className={styles['text-total']}>Сумма заказа: <b className={styles['text-primary']}>{totalPrice} ₽</b></p>
            </div>

            <div className={styles['action-bar']}>
              <Link href="/" passHref>
                <Button
                  variant="outline-secondary"
                  component="a"
                ><ArrowIcon /><span>Вернуться в каталог</span></Button>
              </Link>

              <Button
                variant="primary"
                aria-label={`Всего товаров в корзине: ${quantity}. Сумма заказа: ${totalPrice} ₽. Оплатить заказ.`}
                onClick={makeOrder}
              >Оплатить заказ</Button>
            </div>
          </>
          :
          <div className={styles['empty-msg']}>
            <H
              component="h2"
              className={styles['empty-msg__title']}
            >Корзина пуста 😕</H>
            <p>Вероятнее всего, вы еще не заказывали пиццу.</p>
            <p>Для того, чтобы заказать пиццу, перейдите в каталог.</p>
            <div className={styles['empty-msg__img']}>
              <CartImage />
            </div>
            <Link href="/" passHref>
              <Button
                variant="black"
                component="a"
              ><ArrowIcon /><span>Вернуться в каталог</span></Button>
            </Link>
          </div>
      }
    </>
  );
}
