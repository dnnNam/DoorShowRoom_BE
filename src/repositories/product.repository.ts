import { Prisma } from '../../generated/prisma/client'
import { prisma } from '../lib/prisma'
import { ProductFilter } from '~/model/requests/product.request'

export const productRepository = {
  findAll: async () => {
    return await prisma.products.findMany({
      include: {
        ProductImages: {
          where: {
            IsPrimary: true
          }
        },
        Categories: {
          select: {
            CategoryName: true
          }
        }
      }
    })
  },

  filterProducts: async ({ CategoryId, MinPrice, MaxPrice, Material, Size, Color }: ProductFilter) => {
    const where: Prisma.ProductsWhereInput = {
      IsActive: true
    }

    // Filter theo category
    if (Array.isArray(CategoryId) && CategoryId.length > 0) {
      where.CategoryId = {
        in: CategoryId.map((id) => Number(id))
      }
    }

    if (MinPrice !== undefined || MaxPrice !== undefined) {
      where.Price = {}

      if (typeof MinPrice === 'string') {
        where.Price.gte = parseFloat(MinPrice)
      }

      if (typeof MaxPrice === 'string') {
        where.Price.lte = parseFloat(MaxPrice)
      }
    }

    if (Array.isArray(Size) && Size.length > 0) {
      where.Size = { in: Size }
    }

    if (Array.isArray(Color) && Color.length > 0) {
      where.Color = { in: Color }
    }

    if (Array.isArray(Material) && Material.length > 0) {
      where.Material = { in: Material }
    }

    return await prisma.products.findMany({
      where,
      include: {
        ProductImages: {
          where: {
            IsPrimary: true
          }
        },
        Categories: {
          select: {
            CategoryName: true
          }
        }
      }
    })
  }
}
