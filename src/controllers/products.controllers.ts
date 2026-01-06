import HTTP_STATUS from '~/constants/httpStatus'
import { ParamsDictionary } from 'express-serve-static-core'
import productsService from '~/services/products.services'
import { Request, Response } from 'express'
import { ProductFilter } from '~/model/requests/product.request'
export const getProducts = async (req: Request, res: Response) => {
  // nếu có query thì lọc
  if (Object.keys(req.query).length > 0) {
    const products = await productsService.filterProducts(req.query as ProductFilter)
    res.status(HTTP_STATUS.OK).json({ message: 'Filter products successfully', data: products })
  } else {
    const products = await productsService.getAllProducts()
    res.status(HTTP_STATUS.OK).json({ message: 'Get all products successfully', data: products })
  }
}
