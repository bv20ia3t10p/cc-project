import { useMutation } from "@tanstack/react-query";
import { Review } from "@/models/products/Product";
import { App } from "antd";
import { ReviewApiClient } from "@/utils/api/api-client/ReviewApiClient";

export const useReviewService = () => {
  const { message } = App.useApp();
  const reviewApiClient = new ReviewApiClient();

  const {
    mutate: postReview,
    isPending,
    isError,
  } = useMutation<
    void, // Return type (void, since no meaningful response is expected for posting a review)
    Error, // Error type
    { productId: number; review: Review } // Input type (productId and review payload)
  >({
    mutationFn: async ({ productId, review }) => {
      // Call the API client's postReview method
      await reviewApiClient.postReview(productId, review);
    },
    onMutate: () => {
      message.loading({ content: "Submitting review...", key: "review" });
    },
    onSuccess: () => {
      message.success({
        content: "Review submitted successfully!",
        key: "review",
      });
    },
    onError: (error) => {
      message.error({ content: "Failed to submit review", key: "review" });
      console.error("Review submission error:", error);
    },
    onSettled: () => {
      message.destroy("review");
    },
  });

  return {
    postReview, // Function to call when posting a review
    isPending, // Loading state
    isError, // Error state
  };
};
