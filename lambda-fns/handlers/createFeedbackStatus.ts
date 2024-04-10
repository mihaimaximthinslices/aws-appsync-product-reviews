import { FeedbackStatus, PrismaClient } from '@prisma/client';
import { HandlerError } from '../errors';

export async function createFeedbackStatus(
  prisma: PrismaClient,
  data: FeedbackStatus,
) {
  const feedbackStatus = await prisma.feedbackStatus.findFirst({
    where: {
      name: data.name,
    },
  });

  if (feedbackStatus) {
    throw new HandlerError('Feedback status already exists', 400);
  }

  return await prisma.feedbackStatus.create({
    data,
  });
}
