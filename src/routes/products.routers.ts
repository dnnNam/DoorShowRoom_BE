import express from 'express'
const productRouter = express.Router()
/**
 * @openapi
 * /products:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: OK
 */
productRouter.get('/', (req, res) => {
  res.json([])
})

export default productRouter
