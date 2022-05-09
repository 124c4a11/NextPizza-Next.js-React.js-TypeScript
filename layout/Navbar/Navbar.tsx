import styles from './Navbar.module.scss';

import { Container } from 'layout/Container/Container';
import { Bag, Logo } from 'components';


export function Navbar(): JSX.Element {
  return (
    <Container component="nav">
      <ul className={styles['navbar']}>
        <li><Logo /></li>
        <li><Bag /></li>
      </ul>
    </Container>
  );
}
