import { Category } from "@/models/Category";
import { ApiClient } from "./ApiClient";
import { Environment } from "@/utils/env/Environment";
import { HeaderConfiguration } from "@/models/api/HeaderConfiguration";

export class CategoryApiClient extends ApiClient<Array<Category>> {
  constructor() {
    const categoryUrl = 'https://dummyjson.com/products';
    super(categoryUrl, new HeaderConfiguration());
  }
  getAllCategories() {
    return this.get({
      path: "categories",
    });
  }
}
