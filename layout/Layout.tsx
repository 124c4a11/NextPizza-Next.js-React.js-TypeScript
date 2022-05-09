import cn from 'classnames';
import {
  KeyboardEvent,
  ReactNode,
  useRef
} from 'react';


import styles from './Layout.module.scss';

import { Container } from './Container/Container';
import { Button } from 'components';
import { Navbar } from './Navbar/Navbar';


interface LayoutProps {
  children: ReactNode;
}


export function Layout({ children }: LayoutProps): JSX.Element {
  const mainRef = useRef<HTMLDivElement>(null);

  function skipContentAction(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();

      mainRef.current?.focus();
    }
  }

  return (
    <div className={styles['layout']}>
      <Button
        variant="black"
        className={cn(
          'visually-hidden-focusable',
          styles['skip-btn'],
        )}
        onKeyDown={skipContentAction}
      >Перейти к основному контенту</Button>

      <div className={styles['layout__inner']}>
        <Navbar />
        <Container
          component="main"
          className="flow"
          ref={mainRef}
          tabIndex={0}
        >{children}</Container>
      </div>
    </div>
  )
}
