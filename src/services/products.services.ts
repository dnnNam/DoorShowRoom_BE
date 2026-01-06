import { ProductFilter } from '~/model/requests/product.request'
import { productRepository } from '~/repositories/product.repository'

class ProductsService {
  async getAllProducts() {
    // logic để lấy tất cả sản phẩm từ cơ sở dữ liệu
    const products = await productRepository.findAll()
    return products
  }

  async filterProducts(filters: ProductFilter) {
    const { CategoryId, MinPrice, MaxPrice, Material, Size, Color } = filters

    const result = await productRepository.filterProducts({
      CategoryId,
      MinPrice,
      MaxPrice,
      Material,
      Size,
      Color
    })
    return result
  }
}

const productsService = new ProductsService()
export default productsService
