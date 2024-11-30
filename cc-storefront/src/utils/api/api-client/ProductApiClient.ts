import { ApiClient } from "./ApiClient";
import { Environment } from "@/utils/env/Environment";
import { Product } from "@/models/products/Product";
export class ProductApiClient extends ApiClient<Product> {
  constructor() {
    super(Environment.getEnvVariable("PRODUCT_SERVICE"));
  }
  getProductById(id: number) {
    return this.get({ path: `/${id}` });
  }
}
