import type { NextPage } from 'next';
import Head from 'next/head';
import { END } from 'redux-saga';

import { wrapper } from 'store';
import { productsFetchRequest } from 'store/reducers/products/products.reducer';


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Next Pizza - Пиццы</title>
      </Head>
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
