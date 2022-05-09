import axios from 'axios';

import { IFilter } from '@/interfaces/IFilter';
import { IPizza } from '@/interfaces/IPizza';


export class ProductsService {
  static async getAll(filter?: IFilter): Promise<IPizza[]> {
    const sortby = filter?.sortBy || 'price';
    let category = filter?.category?.id;

    if (category === undefined) category = 'all';

    const { data } = await axios.get<IPizza[]>(
      `${process.env.NEXT_PUBLIC_API_HOST}/products`,
      {
        params: { sortby, category }
      }
    );

    return data;
  }
}
