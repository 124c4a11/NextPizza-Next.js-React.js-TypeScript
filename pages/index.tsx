import type { NextPage } from 'next';
import Head from 'next/head';
import { END } from 'redux-saga';

import { wrapper } from 'store';
import { productsFetchRequest } from 'store/reducers/products/products.reducer';
import { getProducts } from 'store/reducers/products/products.selectors';

import { useAppSelector } from 'hooks/redux.hooks';
import { Card } from 'components';


const Home: NextPage = () => {
  const { products } = useAppSelector(getProducts);

  return (
    <>
      <Head>
        <title>Next Pizza - Пиццы</title>
      </Head>

      {
        products && <Card product={products[0]} />
      }
    </>
  )
};


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(productsFetchRequest());
    store.dispatch(END);

    await store.sagaTask?.toPromise();

    return { props: {} }
  }
);


export default Home;
