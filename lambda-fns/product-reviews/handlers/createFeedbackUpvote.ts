import { PrismaClient, Upvote } from '@prisma/client';

export async function createFeedbackUpvote(prisma: PrismaClient, data: Upvote) {
  const feedback = await prisma.feedback.findFirst({
    where: { id: data.feedbackId },
  });
  if (!feedback) {
    throw new Error('Feedback not found');
  }

  const upvote = await prisma.upvote.findFirst({
    where: {
      userId: data.userId,
      feedbackId: data.feedbackId,
    },
  });

  if (upvote) {
    throw new Error('User has already upvoted this feedback');
  }

  return prisma.upvote.create({
    data,
  });
}
