import express from 'express'
import { getAllProducts } from '~/controllers/products.controllers'
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
productRouter.get('/products', wrapAsync(getAllProducts))

export default productRouter
