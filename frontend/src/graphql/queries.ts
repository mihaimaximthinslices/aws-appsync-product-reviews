/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUserInformationById = /* GraphQL */ `query GetUserInformationById($data: UserInformationInput) {
  getUserInformationById(data: $data) {
    userId
    email
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserInformationByIdQueryVariables,
  APITypes.GetUserInformationByIdQuery
>;
export const getAllProducts = /* GraphQL */ `query GetAllProducts {
  getAllProducts {
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
` as GeneratedQuery<
  APITypes.GetAllProductsQueryVariables,
  APITypes.GetAllProductsQuery
>;
export const getAllFeedbacksByProductId = /* GraphQL */ `query GetAllFeedbacksByProductId($data: FeedbackByProductIdInput) {
  getAllFeedbacksByProductId(data: $data) {
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
` as GeneratedQuery<
  APITypes.GetAllFeedbacksByProductIdQueryVariables,
  APITypes.GetAllFeedbacksByProductIdQuery
>;
export const getAllFeedbackStatuses = /* GraphQL */ `query GetAllFeedbackStatuses {
  getAllFeedbackStatuses {
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
` as GeneratedQuery<
  APITypes.GetAllFeedbackStatusesQueryVariables,
  APITypes.GetAllFeedbackStatusesQuery
>;
export const getAllFeedbackCategories = /* GraphQL */ `query GetAllFeedbackCategories {
  getAllFeedbackCategories {
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
` as GeneratedQuery<
  APITypes.GetAllFeedbackCategoriesQueryVariables,
  APITypes.GetAllFeedbackCategoriesQuery
>;
