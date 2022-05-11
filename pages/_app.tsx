import 'scss/global.scss';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Layout } from 'layout/Layout';

import { wrapper } from 'store';
import { setCart } from 'store/reducers/cart/cart.reducer';
import { useAppDispatch } from 'hooks/redux.hooks';

import { getCartFromLocalStorage } from 'utils/cart-local-storage';


function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cart = getCartFromLocalStorage();

    if (cart) dispatch(setCart(cart));
  }, [dispatch]);


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}


export default wrapper.withRedux(MyApp);
