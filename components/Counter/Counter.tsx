import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

import styles from './Counter.module.scss';

import MinusIcon from './icons/minus.svg';
import PlusIcon from './icons/plus.svg';

import { Button } from 'components';


interface CounterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: string | number;
  increment: () => void;
  decrement: () => void;
  incrementAriaLabel?: string;
  decrementAriaLabel?: string;
}


export function Counter({
  value,
  className,
  increment,
  decrement,
  incrementAriaLabel,
  decrementAriaLabel,
}: CounterProps): JSX.Element {
  return (
    <div
      className={cn(
        styles['counter'],
        className,
      )}
    >
      <Button
        variant="outline-primary"
        shape="circle"
        aria-label={decrementAriaLabel}
        onClick={decrement}
        disabled={value === 1}
      ><MinusIcon /></Button>

      <span className={styles['counter__value']}>
        <span className="visually-hidden">Количество товара: </span>
        {value}
      </span>

      <Button
        variant="outline-primary"
        shape="circle"
        aria-label={incrementAriaLabel}
        onClick={increment}
      ><PlusIcon /></Button>
    </div>
  );
}
