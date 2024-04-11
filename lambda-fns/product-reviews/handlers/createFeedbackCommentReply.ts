import { FeedbackCommentReply, PrismaClient } from '@prisma/client';

export async function createFeedbackCommentReply(
  prisma: PrismaClient,
  data: FeedbackCommentReply,
) {
  const feedbackCommentUser = await prisma.feedbackComment.findUnique({
    where: { id: data.feedbackCommentId },
    select: {
      userId: true,
    },
  });

  if (!feedbackCommentUser) {
    throw new Error('Feedback Comment not found');
  }

  const feedbackCommentRepliesUsers =
    await prisma.feedbackCommentReply.findMany({
      where: { feedbackCommentId: data.feedbackCommentId },
      select: {
        userId: true,
      },
    });

  const possibleReplyUsers = [
    feedbackCommentUser?.userId,
    ...feedbackCommentRepliesUsers.map((reply) => reply.userId),
  ];

  if (!possibleReplyUsers.includes(data.taggedUserId!)) {
    throw new Error('User not allowed to reply to this comment');
  }

  return await prisma.feedbackCommentReply.create({
    data,
  });
}
