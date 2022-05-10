import {
  ChangeEvent,
  ComponentProps,
  ElementType,
  useState
} from 'react';
import cn from 'classnames';
import Image from 'next/image';

import styles from './Card.module.scss';

import PlusIcon from './plus.svg';

import { IPizza } from 'interfaces/IPizza';
import { doughTypes } from 'utils/static-data';
import { Button } from 'components';


interface OwnProps<T> {
  product: IPizza;
  component?: T extends ('div' | 'li') ? T : 'div';
}


type CardProps<T extends ElementType> =
  & OwnProps<T>
  & Omit<ComponentProps<T>, keyof OwnProps<T>>;


const staticSizes = [26, 30, 40];

export function Card<T extends ElementType = 'div'>({
  product,
  component,
  className,
  ...props
}: CardProps<T>): JSX.Element {
  const {
    id,
    name,
    imageUrl,
    price,
    sizes,
    types,
  } = product;

  const [size, setSize] = useState<number>(sizes[0]);
  const [type, setType] = useState<number>(types[0]);

  const Component = component || 'div';

  function changeSize(e: ChangeEvent<HTMLInputElement>) {
    setSize(Number(e.target.value));
  }

  function changeType(e: ChangeEvent<HTMLInputElement>) {
    setType(Number(e.target.value));
  }

  return (
    <Component
      className={cn(
        styles['card'],
        className
      )}
      {...props}
    >
      <div>
        <Image
          width={260}
          height={260}
          src={imageUrl}
          alt={name}
        />
      </div>
      <h3 className={styles['card__title']}>{name}</h3>
      <div className={styles['card__options']}>
        <fieldset className={styles['card__options-fieldset']}>
          <legend className="visually-hidden">{`Пицца ${name} тип теста:`}</legend>
          {
            <ul className={styles['card__options-list']}>
              {
                doughTypes.map((dough, ndx) => (
                  <li key={dough} className={styles['card__options-list-item']}>
                    <label
                      className={styles['card__option']}
                      aria-hidden={!types.includes(ndx)}
                    >
                      <input
                        type="radio"
                        name={`${id}-dough`}
                        className={cn("visually-hidden", styles['card__option-input'])}
                        value={ndx}
                        defaultChecked={ndx === types[0]}
                        disabled={!types.includes(ndx)}
                        onChange={changeType}
                      />
                      <span className={styles['card__option-text']}>
                        <span className="visually-hidden">{`Пицца ${name}. Тип теста: `}</span>
                        {dough}
                      </span>
                    </label>
                  </li>
                ))
              }
            </ul>
          }
        </fieldset>
        <fieldset className={styles['card__options-fieldset']}>
          <legend className="visually-hidden">{`Пицца ${name} Размер:`}</legend>
          {
            <ul className={styles['card__options-list']}>
              {
                staticSizes.map((size) => (
                  <li key={size} className={styles['card__options-list-item']}>
                    <label
                      className={styles['card__option']}
                      aria-hidden={!sizes.includes(size)}
                    >
                      <input
                        type="radio"
                        name={`${id}-size`}
                        className={cn("visually-hidden", styles['card__option-input'])}
                        value={size}
                        defaultChecked={size === sizes[0]}
                        disabled={!sizes.includes(size)}
                        onChange={changeSize}
                      />
                      <span className={styles['card__option-text']}>
                        <span className="visually-hidden">{`Пицца ${name}. размер: `}</span>
                        {`${size} см.`}
                      </span>
                    </label>
                  </li>
                ))
              }
            </ul>
          }
        </fieldset>
      </div>
      <div className={styles['card__footer']}>
        <p className={styles['card__price']}>
          <span className="visually-hidden">Цена: </span>
          {`${price} ₽`}
        </p>
        <Button
          variant="outline-primary"
          counter={1}
          aria-label={`Пицца ${name}. Цена: ${price} ₽ добавить в корзину. Количество товара в корзине ${1}.`}
        ><PlusIcon /><span>Добавить</span></Button>
      </div>
    </Component>
  );
}
