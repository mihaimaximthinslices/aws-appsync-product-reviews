import { PrismaClient } from '@prisma/client';

export async function getAllProducts(prisma: PrismaClient) {
  return await prisma.product.findMany();
}
