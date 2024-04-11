import { PrismaClient } from '@prisma/client';

export async function getAllFeedbackCategories(prisma: PrismaClient) {
  return await prisma.feedbackCategory.findMany();
}
