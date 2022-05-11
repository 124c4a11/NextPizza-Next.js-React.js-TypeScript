import cn from 'classnames';
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode
} from 'react';

import styles from './H.module.scss';


export interface HProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: ReactNode;
}


export function H({
  component = 'h1',
  className,
  children,
}: HProps): JSX.Element {
  const Component = component || 'h1';

  return (
    <Component
      className={cn(
        styles['h'],
        className,
      )}
    >{children}</Component>
  )
}
