import { FeedbackStatus, PrismaClient } from '@prisma/client';

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
    throw new Error('Feedback status already exists');
  }

  return await prisma.feedbackStatus.create({
    data,
  });
}
