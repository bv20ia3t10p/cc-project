import { ProductApiResponse } from "@/models/products/Product";
import { ApiClient } from "./ApiClient";
import { Environment } from "@/utils/env/Environment";
import { Entity } from "@/models/Entity";

export class PaginationParam extends Entity {
  limit: number;
  skip: number;
  constructor({ limit, skip }: { limit: number; skip: number }) {
    super();
    this.limit = limit;
    this.skip = skip;
  }
}

export class ProductApiClient extends ApiClient<ProductApiResponse> {
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
