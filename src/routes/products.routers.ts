import express from 'express'
import { getProducts } from '~/controllers/products.controllers'
import { ProductFilterValidator } from '~/middlewares/product.middlewares'
import { wrapAsync } from '~/utils/handler'
const productRouter = express.Router()
/**
 * @openapi
 * /products:
 *   get:
 *     summary: Lấy danh sách sản phẩm (có hỗ trợ lọc)
 *     description: |
 *       Lấy danh sách sản phẩm.
 *       Có thể truyền query để lọc theo:
 *       - Danh mục
 *       - Khoảng giá
 *       - Kích thước
 *       - Màu sắc
 *       - Chất liệu
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         style: form
 *         explode: true
 *
 *       - in: query
 *         name: MinPrice
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: MaxPrice
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: Size
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: true
 *
 *       - in: query
 *         name: Color
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: true
 *
 *       - in: query
 *         name: Material
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: true
 *
 *     responses:
 *       200:
 *         description: OK
 */

productRouter.get('/', ProductFilterValidator, wrapAsync(getProducts))

export default productRouter
