import { prisma } from '../lib/prisma'

export const productRepository = {
  findAll: async () => {
    return await prisma.products.findMany()
  }
}
