import { productRepository } from '~/repositories/product.repository'

class ProductsService {
  async getAllProducts() {
    // logic để lấy tất cả sản phẩm từ cơ sở dữ liệu
    const products = await productRepository.findAll()
    return products
  }
}

const productsService = new ProductsService()
export default productsService
