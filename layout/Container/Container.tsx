import cn from 'classnames';
import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  forwardRef
} from 'react';

import styles from './Container.module.scss';


interface OwnProps<T extends ElementType> {
  component?: T;
}


type ContainerProps<T extends ElementType> =
  & OwnProps<T>
  & Omit<ComponentProps<T>, keyof OwnProps<T>>;


type PolymorphicRef<T extends ElementType> =
  ComponentPropsWithRef<T>['ref'];


type ContainerComponent =
  <T extends ElementType = 'div'>(props: ContainerProps<T>) => JSX.Element | null;


export const Container: ContainerComponent = forwardRef(
  function Container<T extends ElementType = 'div'>(
    {
      component,
      className,
      children,
      ...props
    }: ContainerProps<T>,
    ref: PolymorphicRef<T>
  ): JSX.Element {
    const Component = component || 'div';

    return (
      <Component
        className={cn(
          styles['container'],
          className
        )}
        {...props}
        ref={ref}
      >{children}</Component>
    );
  }
);
