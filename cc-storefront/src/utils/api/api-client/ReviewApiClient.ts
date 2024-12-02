import { HeaderConfiguration } from "@/models/api/HeaderConfiguration";
import { Review } from "@/models/products/Product";
import { Environment } from "@/utils/env/Environment";
import { ApiClient } from "./ApiClient";

export class ReviewApiClient extends ApiClient<Review> {
  constructor() {
    const localStorageAccount = localStorage.getItem("account");
    const accessToken = localStorageAccount
      ? JSON.parse(localStorageAccount).accessToken
      : "";
    super(
      Environment.getEnvVariable("PRODUCT_SERVICE"),
      new HeaderConfiguration({
        auth: "Bearer " + accessToken,
      })
    );
  }
  postReview(productId: number, review: Review) {
    this.post({ path: `${productId}/reviews`, body: review.toRecord() });
  }
}
