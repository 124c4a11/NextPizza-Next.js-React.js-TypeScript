import cn from 'classnames';
import {
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react';

import styles from './Categories.module.scss';

import { ICategory } from 'interfaces/ICategory';

import { categories } from 'utils/static-data';

import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';

import { setCategory } from 'store/reducers/filter/filter.reducer';
import { getFilter } from 'store/reducers/filter/filter.selectors';

import { productsFetchRequest } from 'store/reducers/products/products.reducer';


interface CategoriesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { };


export function Categories({
  className,
  ...props
}: CategoriesProps): JSX.Element {
  const filter = useAppSelector(getFilter);
  const { category: currentCategory } = filter;
  const dispatch = useAppDispatch();

  function onSelect(category: ICategory) {
    dispatch(setCategory(category));
    dispatch(productsFetchRequest({ ...filter, category }));
  }

  return (
    <div
      className={cn(
        className,
        styles['categories']
      )}
      {...props}
    >
      <fieldset className={styles['categories__fieldset']}>
        <legend className="visually-hidden">Пицца. Выбрать категорию.</legend>
        <ul className={styles['categories__list']}>
          {
            categories.map((category) => (
              <li key={category.id} className={styles['categories__list-item']}>
                <label className={styles['categories__item-label']}>
                  <input
                    className={cn(
                      "visually-hidden",
                      styles['categories__item-input'],
                      styles['categories__visually-hidden'],
                    )}
                    type="radio"
                    name="options"
                    value={category.id}
                    defaultChecked={category.id === currentCategory?.id}
                    onChange={() => onSelect(category)}
                  />
                  <span className={styles['categories__item-text']}>
                    <span
                      className={cn(
                        'visually-hidden',
                        styles['categories__visually-hidden'],
                      )}
                    >Категория: пиццы </span>
                    {category.title}
                  </span>
                </label>
              </li>
            ))
          }
        </ul>
      </fieldset>
    </div>
  );
}
