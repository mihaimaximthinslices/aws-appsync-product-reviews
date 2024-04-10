import { PrismaClient } from '@prisma/client';

export async function getAllFeedbacksByProductId(
  prisma: PrismaClient,
  productId: string,
) {
  return await prisma.feedback.findMany({
    where: {
      productId: productId,
    },
    include: {
      feedbackCategory: true,
      feedbackStatus: true,
    },
  });
}
