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

  filterProducts: async ({ CategoryId, MinPrice, MaxPrice, Materials, Sizes, Colors }: ProductFilter) => {
    const where: Prisma.ProductsWhereInput = {
      IsActive: true
    }

    // Filter theo category
    if (CategoryId) {
      if (Array.isArray(CategoryId) && CategoryId.length > 0) {
        where.Categories = {
          CategoryId: { in: CategoryId.map((id) => Number(id)) }
        }
      } else {
        where.CategoryId = Number(CategoryId)
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

    if (Sizes) {
      if (Array.isArray(Sizes) && Sizes.length > 0) {
        where.Size = { in: Sizes }
      } else if (typeof Sizes === 'string') {
        where.Size = Sizes
      }
    }

    if (Colors) {
      if (Array.isArray(Colors) && Colors.length > 0) {
        where.Color = { in: Colors }
      } else if (typeof Colors === 'string') {
        where.Color = Colors
      }
    }

    if (Materials) {
      if (Array.isArray(Materials) && Materials.length > 0) {
        where.Material = { in: Materials }
      } else if (typeof Materials === 'string') {
        where.Material = Materials
      }
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
