import HTTP_STATUS from '~/constants/httpStatus'
import { productRepository } from '~/repositories/product.repository'
import productsService from '~/services/products.services'
import { Request, Response } from 'express'
export const getAllProducts = async (req: Request, res: Response) => {
  // logic để lấy tất cả sản phẩm từ cơ sở dữ liệu
  const products = await productsService.getAllProducts()
  if (products) {
    return res.status(HTTP_STATUS.OK).json(products)
  }
}
