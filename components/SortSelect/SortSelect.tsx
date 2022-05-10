import cn from 'classnames';
import {
  ChangeEvent,
  DetailedHTMLProps,
  HTMLAttributes,
  KeyboardEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState
} from 'react';

import styles from './SortSelect.module.scss';

import ArrowIcon from './filled-arrow.svg';

import { IFilter } from 'interfaces/IFilter';
import { MouseEventWithPath } from 'interfaces/MouseEventWithPath';
import { Button } from 'components';

import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { getFilter } from 'store/reducers/filter/filter.selectors';
import { setSortBy } from 'store/reducers/filter/filter.reducer';
import { productsFetchRequest } from 'store/reducers/products/products.reducer';


interface SortSelectProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }


interface SortOption {
  value: IFilter['sortBy'];
  title: 'цене' | 'популярности';
}


const options: SortOption[] = [
  { value: 'price', title: 'цене' },
  { value: 'rating', title: 'популярности' },
];


export function SortSelect({
  className,
  ...props
}: SortSelectProps): JSX.Element {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(getFilter);
  const { sortBy } = filter;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTitle, setSelectedTitle] = useState<SortOption['title']>('цене');

  const selectRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const selectedOptionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.addEventListener('click', onOutsideClick);

    setSelectedTitle(getSelectedTitle());

    return () => {
      document.body.removeEventListener('click', onOutsideClick);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectedTitle(getSelectedTitle());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  useEffect(() => {
    if (isOpen && selectedOptionRef) {
      selectedOptionRef.current?.focus();
    }
  }, [isOpen]);

  function getSelectedTitle(): SortOption['title'] {
    const option = options.find(({ value }) => value === sortBy);

    return option?.title as SortOption['title'];
  }

  function onSelect(e: ChangeEvent<HTMLInputElement>) {
    const sortBy = e.target.value as IFilter['sortBy'];

    dispatch(setSortBy(sortBy));
    dispatch(productsFetchRequest({ ...filter, sortBy }));
  }

  function toggleOpen(e: SyntheticEvent<HTMLButtonElement>) {
    setIsOpen(!isOpen);
  }

  function onOutsideClick(e: MouseEventWithPath) {
    const path = e.path || (e.composedPath && e.composedPath());

    if (!path.includes(selectRef.current as EventTarget)) {
      setIsOpen(false);
    }
  }

  function closeDropdown() {
    setIsOpen(false);
    buttonRef.current?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLUListElement>) {
    if (e.code !== 'Tab' && e.code !== 'Enter' && e.code !== 'Escape') return;

    e.preventDefault();

    closeDropdown();
  }

  function onClickByOption(e: SyntheticEvent<HTMLSpanElement>) {
    if (e.type === 'click') return;

    closeDropdown();
  }

  return (
    <div
      className={cn(
        className,
        styles['select']
      )}
      {...props}
      ref={selectRef}
    >
      <Button
        variant="text-black"
        shape="text"
        ref={buttonRef}
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <ArrowIcon
          className={cn(
            styles['select__arrow'],
            {
              [styles['select__arrow_down']]: !isOpen
            }
          )}
        />
        <b>Сортировать по:</b>
        <span className={styles['select__selected']}>{selectedTitle}</span>
      </Button>
      <ul
        className={cn(
          styles['select__dropdown'],
          {
            [styles['select__dropdown_opened']]: isOpen
          }
        )}
        onKeyDown={onKeyDown}
      >
        {
          options.map(({ value, title }) => (
            <li key={value}>
              <label
                className={styles['select__option']}
                onMouseUp={onClickByOption}
              >
                <input
                  className={cn(
                    'visually-hidden',
                    styles['select__option-input']
                  )}
                  type="radio"
                  name="sortby"
                  value={value}
                  defaultChecked={value === sortBy}
                  ref={(value === sortBy) ? selectedOptionRef : null}
                  onChange={onSelect}
                  onClick={onClickByOption}
                />
                <span className={styles['select__option-text']}>
                  <span className="visually-hidden">Сортировать</span>
                  {`по ${title}`}
                </span>
              </label>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
