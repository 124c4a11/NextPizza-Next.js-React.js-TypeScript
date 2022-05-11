import { H, HProps } from 'components';

import { useAppSelector } from 'hooks/redux.hooks';
import { getCategory } from 'store/reducers/filter/filter.selectors';


interface CatalogTitleProps extends Omit<HProps, 'children'> { };


export function CatalogTitle({
  component,
  ...props
}: CatalogTitleProps): JSX.Element {
  const selectedCategory = useAppSelector(getCategory);

  return (
    <H component={component || "h2"} {...props}>{`${selectedCategory?.title} пиццы`}</H>
  );
}
