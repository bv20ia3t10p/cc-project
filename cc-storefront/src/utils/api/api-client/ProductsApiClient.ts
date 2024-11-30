import { ProductApiResponse } from "@/models/products/Product";
import { ApiClient } from "./ApiClient";
import { Environment } from "@/utils/env/Environment";
import { PaginationParam } from "../../../models/api/PaginationParam";

export class ProductsApiClient extends ApiClient<ProductApiResponse> {
  constructor() {
    super(Environment.getEnvVariable("PRODUCT_SERVICE"));
  }
  getAllProducts() {
    return this.get({
      path: "",
      params: new PaginationParam({
        limit: 194,
        skip: 0,
      }).toRecord(),
    });
  }
}
