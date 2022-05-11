import { NextPage } from 'next';
import Head from 'next/head';

import { Cart } from 'components';


const CartPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>NextPizza - Корзина</title>
      </Head>
      <Cart />
    </>
  )
};


export default CartPage;
