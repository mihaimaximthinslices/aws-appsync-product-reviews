import { PrismaClient } from '@prisma/client';
import {
  createFeedbackCategory,
  createFeedbackStatus,
  createProduct,
  getAllProducts,
  getAllFeedbacksByProductId,
  getAllFeedbackCategories,
  getAllFeedbackStatuses,
  createFeedbackComment,
  createFeedbackCommentReply,
  createFeedbackUpvote,
  deleteFeedbackUpvote,
} from './handlers';
import { createFeedback } from './handlers';

const prisma = new PrismaClient();
exports.handler = async (event: any) => {
  const {
    arguments: { data },
    identity: {
      claims: { sub },
    },
  } = event;

  console.log('Event:', event);

  switch (event.info.fieldName) {
    case 'createProduct':
      return createProduct(prisma, {
        ...data,
        ownerId: sub,
      });
    case 'getAllProducts':
      return getAllProducts(prisma);

    case 'createFeedbackStatus':
      return createFeedbackStatus(prisma, data);

    case 'createFeedbackCategory':
      return createFeedbackCategory(prisma, data);

    case 'createFeedback':
      return createFeedback(prisma, {
        ...data,
        userId: sub,
      });

    case 'getAllFeedbacksByProductId':
      return getAllFeedbacksByProductId(prisma, data.productId);

    case 'getAllFeedbackCategories':
      return getAllFeedbackCategories(prisma);

    case 'getAllFeedbackStatuses':
      return getAllFeedbackStatuses(prisma);

    case 'createFeedbackComment':
      return createFeedbackComment(prisma, {
        ...data,
        userId: sub,
      });

    case 'createFeedbackCommentReply':
      return createFeedbackCommentReply(prisma, {
        ...data,
        userId: sub,
      });

    case 'createFeedbackUpvote':
      return createFeedbackUpvote(prisma, { ...data, userId: sub });

    case 'deleteFeedbackUpvote':
      return deleteFeedbackUpvote(prisma, { ...data, userId: sub });

    default:
      return null;
  }
};
