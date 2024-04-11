import { PrismaClient } from '@prisma/client';

export async function getAllFeedbackStatuses(prisma: PrismaClient) {
  return await prisma.feedbackStatus.findMany();
}
