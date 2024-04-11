import { PrismaClient, Product } from '@prisma/client';

export async function createProduct(prisma: PrismaClient, data: Product) {
  return await prisma.product.create({
    data,
  });
}
