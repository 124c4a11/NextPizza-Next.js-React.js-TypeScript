import ContentLoader from 'react-content-loader';

import { CardGrid, CardGridProps } from 'components';


interface ProductListPreloaderProps extends Omit<CardGridProps, 'children'> { };


function ProductPreloader() {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={460}
      style={{ width: '100%' }}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      title="Загрузка..."
    >
      <circle cx="132" cy="142" r="115" />
      <rect x="0" y="273" rx="6" ry="6" width="280" height="26" style={{ width: '100%' }} />
      <rect x="0" y="310" rx="6" ry="6" width="280" height="84" style={{ width: '100%' }} />
      <rect x="0" y="418" rx="6" ry="6" width="91" height="31" />
      <rect x="137" y="408" rx="25" ry="25" width="140" height="46" />
    </ContentLoader>
  );
}


export function ProductListPreloader(
  props: ProductListPreloaderProps
): JSX.Element {
  return (
    <CardGrid {...props}>
      {
        Array(4).fill(0).map((_, ndx) => (
          <li key={ndx}><ProductPreloader /></li>
        ))
      }
    </CardGrid>
  );
}
