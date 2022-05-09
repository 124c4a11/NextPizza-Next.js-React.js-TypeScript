import type { NextApiRequest, NextApiResponse } from 'next'
import { IPizza } from '../../interfaces/IPizza'
import { products } from './data/products'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPizza[]>
) {
  if (req.method === 'GET') {
    const category = req.query?.category;
    const sortby = req.query?.sortby;

    let filteredProducts: IPizza[] = products;

    if (category !== 'all') {
      filteredProducts = products.filter((product) => {
        return product.category === Number(category)
      });
    }

    switch (sortby) {
      case 'price':
        filteredProducts = filteredProducts.sort(
          (a, b) => a.price - b.price
        );
        break;

      case 'rating':
        filteredProducts = filteredProducts.sort(
          (a, b) => b.rating - a.rating
        );
        break;
    }

    res.status(200).json(filteredProducts);
  }
}
