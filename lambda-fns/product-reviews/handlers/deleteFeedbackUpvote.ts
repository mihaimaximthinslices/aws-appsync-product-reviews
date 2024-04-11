import { PrismaClient } from '@prisma/client';

export async function deleteFeedbackUpvote(
  prisma: PrismaClient,
  data: { userId: string; feedbackId: string },
) {
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

  if (!upvote) {
    throw new Error('Upvote not found');
  }

  if (upvote.userId !== data.userId) {
    throw new Error('User does not have permission to delete upvote');
  }

  return prisma.upvote.delete({
    where: {
      userId_feedbackId: {
        ...data,
      },
    },
  });
}
