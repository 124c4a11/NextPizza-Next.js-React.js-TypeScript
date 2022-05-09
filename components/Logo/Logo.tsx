import cn from 'classnames';
import Link from 'next/link';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

import styles from './Logo.module.scss';

import LogoIcon from './Logo.svg';


interface LogoProps extends DetailedHTMLProps<HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> { }


export function Logo({
  className, ...props
}: LogoProps): JSX.Element {
  return (
    <Link href="/">
      <a
        className={cn(
          styles['logo'],
          className,
        )}
        {...props}
        aria-label="Перейти на главную страницу"
        title="Перейти на главную страницу"
      >
        <LogoIcon className={styles['logo__icon']} />
        <h1 className={styles['logo__title']} translate="no">Next Pizza</h1>
        <p className={styles['logo__subtitle']}>самая вкусная пицца во вселенной</p>
      </a>
    </Link>
  );
}
