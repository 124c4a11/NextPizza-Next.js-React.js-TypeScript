import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  forwardRef,
} from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';


interface OwnProps<T> {
  counter?: number;
  active?: boolean;
  component?: T extends ('button' | 'a') ? T : 'button';
  variant?:
  | 'primary'
  | 'black'
  | 'outline-primary'
  | 'outline-secondary'
  | 'text-secondary'
  | 'text-black';
  shape?: 'rounded' | 'circle' | 'text';
};


type ButtonProps<T extends ElementType> =
  & OwnProps<T>
  & Omit<ComponentProps<T>, keyof OwnProps<T>>;


type PolymorphicRef<T extends ElementType> =
  ComponentPropsWithRef<T>['ref'];


type ButtonComponent =
  <T extends ElementType = 'button'>(props: ButtonProps<T>) => JSX.Element | null;


export const Button: ButtonComponent = forwardRef(
  function Button<T extends ElementType = 'button'>({
    children,
    counter,
    className,
    active,
    component,
    variant = 'primary',
    shape = 'rounded',
    ...props
  }: ButtonProps<T>, ref: PolymorphicRef<T>): JSX.Element {
    const classNames = cn(
      className,
      styles['btn'],
      styles[`btn_${shape}`],
      styles[`btn_${variant}`],
      {
        [styles['btn_active']]: active,
      }
    );

    const Component = component || 'button';

    return (
      <Component className={classNames} {...props} ref={ref}>
        {children}
        {
          (shape !== 'circle' && counter && counter > 0)
            ?
            <span className={styles['btn__counter']}>
              {`${counter}`}
            </span>
            :
            null
        }
      </Component>
    );
  }
);
