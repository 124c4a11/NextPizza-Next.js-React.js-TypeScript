import { useAppSelector } from 'hooks/redux.hooks';

import { getProducts } from 'store/reducers/products/products.selectors';

import {
  Card,
  CardGrid,
  CardGridProps,
  ProductListPreloader
} from 'components';


interface ProductListProps extends Omit<CardGridProps, 'children'> { };


export function ProductList(props: ProductListProps): JSX.Element {
  const { products, pending, error } = useAppSelector(getProducts);

  if (pending) return <ProductListPreloader />;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <>
      {
        products.length
          ?
          <CardGrid {...props}>
            {
              products.map((product) => (
                <Card key={product.id} product={product} component="li" />
              ))
            }
          </CardGrid>
          :
          <h3>Список продуктов пуст!</h3>
      }
    </>
  );
}
