import express from 'express'
import { getAllProducts } from '~/controllers/products.controllers'
import { ErrorWithStatus } from '~/model/Errors'
import { wrapAsync } from '~/utils/handler'
const productRouter = express.Router()
/**
 * @openapi
 * /products:
 *   get:
 *     summary: Lấy danh sách sản phẩm theo loại
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: OK
 */

// chức năng lấy tất cả sản phẩm
productRouter.get(
  '/',
  // Middleware thử nghiệm lỗi
  //   (req, res, next) => {
  //     next(
  //       new ErrorWithStatus({
  //         status: 500,
  //         message: 'TEST API ERROR from middleware 1'
  //       })
  //     )
  //   },
  wrapAsync(getAllProducts)
)

export default productRouter
