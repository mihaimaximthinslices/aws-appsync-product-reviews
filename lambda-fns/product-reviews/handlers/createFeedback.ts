import { Feedback, PrismaClient } from '@prisma/client';

export async function createFeedback(prisma: PrismaClient, data: Feedback) {
  const feedbackCategory = prisma.feedbackCategory.findFirst({
    where: {
      id: data.feedbackCategoryId,
    },
  });

  const feedbackStatus = prisma.feedbackStatus.findFirst({
    where: {
      id: data.feedbackStatusId,
    },
  });

  const [feedbackCategoryResult, feedbackStatusResult] = await Promise.all([
    feedbackCategory,
    feedbackStatus,
  ]);

  if (!feedbackCategoryResult || !feedbackStatusResult) {
    throw new Error('Feedback category or status not found');
  }

  return await prisma.feedback.create({
    data,
  });
}
