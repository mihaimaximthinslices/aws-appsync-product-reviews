import { FeedbackComment, PrismaClient } from '@prisma/client';

export async function createFeedbackComment(
  prisma: PrismaClient,
  data: FeedbackComment,
) {
  const feedback = await prisma.feedback.findFirst({
    where: { id: data.feedbackId },
  });

  if (!feedback) {
    throw new Error('Feedback not found');
  }

  return await prisma.feedbackComment.create({
    data,
  });
}
