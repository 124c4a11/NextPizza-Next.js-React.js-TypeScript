import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

import styles from './Filter.module.scss';

import { Categories, SortSelect } from 'components';


interface FilterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }


export function Filter({
  className,
  ...props
}: FilterProps): JSX.Element {
  return (
    <div
      className={cn(
        styles['filter'],
        className,
      )}
      {...props}
    >
      <Categories />
      <div className={styles['filter__select']}>
        <SortSelect />
      </div>
    </div>
  );
}
