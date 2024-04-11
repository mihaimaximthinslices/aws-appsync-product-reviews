import { FeedbackCategory, PrismaClient } from '@prisma/client';

export async function createFeedbackCategory(
  prisma: PrismaClient,
  data: FeedbackCategory,
) {
  const feedbackCategory = await prisma.feedbackCategory.findFirst({
    where: {
      name: data.name,
    },
  });

  if (feedbackCategory) {
    throw new Error('Feedback category already exists');
  }

  return await prisma.feedbackCategory.create({
    data,
  });
}
