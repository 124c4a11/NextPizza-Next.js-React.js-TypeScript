import cn from 'classnames';
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode
} from 'react';

import styles from './CardGrid.module.scss';


export interface CardGridProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  children: ReactNode
}


export function CardGrid({
  children,
  className,
  ...props
}: CardGridProps): JSX.Element {
  return (
    <ul className={cn(styles['grid'], className)} {...props}>
      {children}
    </ul>
  );
}
