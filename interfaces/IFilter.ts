import { ICategory } from './ICategory';


export interface IFilter {
  category?: ICategory;
  sortBy?: 'price' | 'rating';
}
