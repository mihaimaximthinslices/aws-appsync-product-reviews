/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createProduct = /* GraphQL */ `mutation CreateProduct($data: CreateProductInput) {
  createProduct(data: $data) {
    id
    userId
    title
    description
    feedbacks {
      id
      userId
      productId
      title
      feedbackCategoryId
      feedbackStatusId
      details
      comments {
        id
        userId
        feedbackId
        comment
        replies {
          id
          userId
          feedbackCommentId
          taggedUserId
          comment
          __typename
        }
        feedback {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      product {
        id
        userId
        title
        description
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      feedbackCategory {
        id
        name
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      feedbackStatus {
        id
        name
        description
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      upvotes {
        id
        userId
        feedbackId
        feedback {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateProductMutationVariables,
  APITypes.CreateProductMutation
>;
export const createFeedback = /* GraphQL */ `mutation CreateFeedback($data: CreateFeedbackInput) {
  createFeedback(data: $data) {
    id
    userId
    productId
    title
    feedbackCategoryId
    feedbackStatusId
    details
    comments {
      id
      userId
      feedbackId
      comment
      replies {
        id
        userId
        feedbackCommentId
        taggedUserId
        comment
        feedbackComment {
          id
          userId
          feedbackId
          comment
          __typename
        }
        __typename
      }
      feedback {
        id
        userId
        productId
        title
        feedbackCategoryId
        feedbackStatusId
        details
        comments {
          id
          userId
          feedbackId
          comment
          __typename
        }
        product {
          id
          userId
          title
          description
          __typename
        }
        feedbackCategory {
          id
          name
          __typename
        }
        feedbackStatus {
          id
          name
          description
          __typename
        }
        upvotes {
          id
          userId
          feedbackId
          __typename
        }
        __typename
      }
      __typename
    }
    product {
      id
      userId
      title
      description
      feedbacks {
        id
        userId
        productId
        title
        feedbackCategoryId
        feedbackStatusId
        details
        comments {
          id
          userId
          feedbackId
          comment
          __typename
        }
        product {
          id
          userId
          title
          description
          __typename
        }
        feedbackCategory {
          id
          name
          __typename
        }
        feedbackStatus {
          id
          name
          description
          __typename
        }
        upvotes {
          id
          userId
          feedbackId
          __typename
        }
        __typename
      }
      __typename
    }
    feedbackCategory {
      id
      name
      feedbacks {
        id
        userId
        productId
        title
        feedbackCategoryId
        feedbackStatusId
        details
        comments {
          id
          userId
          feedbackId
          comment
          __typename
        }
        product {
          id
          userId
          title
          description
          __typename
        }
        feedbackCategory {
          id
          name
          __typename
        }
        feedbackStatus {
          id
          name
          description
          __typename
        }
        upvotes {
          id
          userId
          feedbackId
          __typename
        }
        __typename
      }
      __typename
    }
    feedbackStatus {
      id
      name
      description
      feedbacks {
        id
        userId
        productId
        title
        feedbackCategoryId
        feedbackStatusId
        details
        comments {
          id
          userId
          feedbackId
          comment
          __typename
        }
        product {
          id
          userId
          title
          description
          __typename
        }
        feedbackCategory {
          id
          name
          __typename
        }
        feedbackStatus {
          id
          name
          description
          __typename
        }
        upvotes {
          id
          userId
          feedbackId
          __typename
        }
        __typename
      }
      __typename
    }
    upvotes {
      id
      userId
      feedbackId
      feedback {
        id
        userId
        productId
        title
        feedbackCategoryId
        feedbackStatusId
        details
        comments {
          id
          userId
          feedbackId
          comment
          __typename
        }
        product {
          id
          userId
          title
          description
          __typename
        }
        feedbackCategory {
          id
          name
          __typename
        }
        feedbackStatus {
          id
          name
          description
          __typename
        }
        upvotes {
          id
          userId
          feedbackId
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateFeedbackMutationVariables,
  APITypes.CreateFeedbackMutation
>;
export const createFeedbackStatus = /* GraphQL */ `mutation CreateFeedbackStatus($data: CreateFeedbackStatusInput) {
  createFeedbackStatus(data: $data) {
    id
    name
    description
    feedbacks {
      id
      userId
      productId
      title
      feedbackCategoryId
      feedbackStatusId
      details
      comments {
        id
        userId
        feedbackId
        comment
        replies {
          id
          userId
          feedbackCommentId
          taggedUserId
          comment
          __typename
        }
        feedback {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      product {
        id
        userId
        title
        description
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      feedbackCategory {
        id
        name
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      feedbackStatus {
        id
        name
        description
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      upvotes {
        id
        userId
        feedbackId
        feedback {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateFeedbackStatusMutationVariables,
  APITypes.CreateFeedbackStatusMutation
>;
export const createFeedbackCategory = /* GraphQL */ `mutation CreateFeedbackCategory($data: CreateFeedbackCategoryInput) {
  createFeedbackCategory(data: $data) {
    id
    name
    feedbacks {
      id
      userId
      productId
      title
      feedbackCategoryId
      feedbackStatusId
      details
      comments {
        id
        userId
        feedbackId
        comment
        replies {
          id
          userId
          feedbackCommentId
          taggedUserId
          comment
          __typename
        }
        feedback {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      product {
        id
        userId
        title
        description
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      feedbackCategory {
        id
        name
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      feedbackStatus {
        id
        name
        description
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      upvotes {
        id
        userId
        feedbackId
        feedback {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateFeedbackCategoryMutationVariables,
  APITypes.CreateFeedbackCategoryMutation
>;
export const createFeedbackComment = /* GraphQL */ `mutation CreateFeedbackComment($data: CreateFeedbackCommentInput) {
  createFeedbackComment(data: $data) {
    id
    userId
    feedbackId
    comment
    replies {
      id
      userId
      feedbackCommentId
      taggedUserId
      comment
      feedbackComment {
        id
        userId
        feedbackId
        comment
        replies {
          id
          userId
          feedbackCommentId
          taggedUserId
          comment
          __typename
        }
        feedback {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      __typename
    }
    feedback {
      id
      userId
      productId
      title
      feedbackCategoryId
      feedbackStatusId
      details
      comments {
        id
        userId
        feedbackId
        comment
        replies {
          id
          userId
          feedbackCommentId
          taggedUserId
          comment
          __typename
        }
        feedback {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      product {
        id
        userId
        title
        description
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      feedbackCategory {
        id
        name
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      feedbackStatus {
        id
        name
        description
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      upvotes {
        id
        userId
        feedbackId
        feedback {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateFeedbackCommentMutationVariables,
  APITypes.CreateFeedbackCommentMutation
>;
export const createFeedbackCommentReply = /* GraphQL */ `mutation CreateFeedbackCommentReply($data: CreateFeedbackCommentReplyInput) {
  createFeedbackCommentReply(data: $data) {
    id
    userId
    feedbackCommentId
    taggedUserId
    comment
    feedbackComment {
      id
      userId
      feedbackId
      comment
      replies {
        id
        userId
        feedbackCommentId
        taggedUserId
        comment
        feedbackComment {
          id
          userId
          feedbackId
          comment
          __typename
        }
        __typename
      }
      feedback {
        id
        userId
        productId
        title
        feedbackCategoryId
        feedbackStatusId
        details
        comments {
          id
          userId
          feedbackId
          comment
          __typename
        }
        product {
          id
          userId
          title
          description
          __typename
        }
        feedbackCategory {
          id
          name
          __typename
        }
        feedbackStatus {
          id
          name
          description
          __typename
        }
        upvotes {
          id
          userId
          feedbackId
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateFeedbackCommentReplyMutationVariables,
  APITypes.CreateFeedbackCommentReplyMutation
>;
export const createFeedbackUpvote = /* GraphQL */ `mutation CreateFeedbackUpvote($data: CreateFeedbackUpvoteInput) {
  createFeedbackUpvote(data: $data) {
    id
    userId
    feedbackId
    feedback {
      id
      userId
      productId
      title
      feedbackCategoryId
      feedbackStatusId
      details
      comments {
        id
        userId
        feedbackId
        comment
        replies {
          id
          userId
          feedbackCommentId
          taggedUserId
          comment
          __typename
        }
        feedback {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      product {
        id
        userId
        title
        description
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      feedbackCategory {
        id
        name
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      feedbackStatus {
        id
        name
        description
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      upvotes {
        id
        userId
        feedbackId
        feedback {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateFeedbackUpvoteMutationVariables,
  APITypes.CreateFeedbackUpvoteMutation
>;
export const deleteFeedbackUpvote = /* GraphQL */ `mutation DeleteFeedbackUpvote($data: DeleteFeedbackUpvoteInput) {
  deleteFeedbackUpvote(data: $data) {
    id
    userId
    feedbackId
    feedback {
      id
      userId
      productId
      title
      feedbackCategoryId
      feedbackStatusId
      details
      comments {
        id
        userId
        feedbackId
        comment
        replies {
          id
          userId
          feedbackCommentId
          taggedUserId
          comment
          __typename
        }
        feedback {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      product {
        id
        userId
        title
        description
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      feedbackCategory {
        id
        name
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      feedbackStatus {
        id
        name
        description
        feedbacks {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      upvotes {
        id
        userId
        feedbackId
        feedback {
          id
          userId
          productId
          title
          feedbackCategoryId
          feedbackStatusId
          details
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteFeedbackUpvoteMutationVariables,
  APITypes.DeleteFeedbackUpvoteMutation
>;
