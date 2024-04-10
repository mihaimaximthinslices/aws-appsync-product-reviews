import { FeedbackCategory, PrismaClient } from '@prisma/client';
import { HandlerError } from '../errors';

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
    throw new HandlerError('Feedback category already exists', 400);
  }

  return await prisma.feedbackCategory.create({
    data,
  });
}
