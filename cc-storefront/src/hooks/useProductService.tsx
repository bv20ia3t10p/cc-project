import { Product } from "@/models/products/Product"; // Assuming Product is a class with a constructor for transformation
import { ProductApiClient } from "@/utils/api/api-client/ProductApiClient";
import { useQuery } from "@tanstack/react-query";
import { App } from "antd";

export const useProductService = () => {
    const { message } = App.useApp();
    const apiClient = new ProductApiClient();

    const { data: productResponse, isLoading, isError } = useQuery({
        queryKey: ["products"], // Unique key for product queries
        queryFn: () => apiClient.getAllProducts(),
        retry: false, // Optional: Disable retries if desired
        staleTime: 300000, // Cache data for 5 minutes
    });

    // Display an error message if the query fails
    if (isError) {
        message.error("Failed to fetch products");
    }

    // Group products by category with additional transformations
    const groupedCategories = productResponse?.products.reduce((acc, product) => {
        if (!acc[product.category]) {
            // Initialize new category with description and empty product list
            acc[product.category] = {
                category: product.category,
                description: product.description,
                products: [],
                averageRating: 0,
                totalProducts: 0,
            };
        }

        // Add the product to the category
        acc[product.category].products.push(product);

        // Recalculate average rating for the category
        const totalRating = acc[product.category].products.reduce(
            (sum, p) =>
                sum +
                p.reviews.reduce((reviewSum, review) => reviewSum + review.rating, 0) /
                    (p.reviews.length || 1),
            0
        );
        acc[product.category].averageRating =
            totalRating / acc[product.category].products.length;

        // Update total products count
        acc[product.category].totalProducts = acc[product.category].products.length;

        return acc;
    }, {} as Record<
        string,
        {
            category: string;
            description: string;
            products: Product[];
            averageRating: number;
            totalProducts: number;
        }
    >) ?? {};

    // Convert grouped categories object to an array
    const productSummaries = Object.values(groupedCategories);

    return {
        productSummaries, // Categories array with grouped products
        products:
            productResponse?.products.map(
                (product) => new Product(product) // Transform API data into Product class instances
            ) ?? [],
        total: productResponse?.total ?? 0, // Total number of products
        skip: productResponse?.skip ?? 0, // Pagination skip value
        limit: productResponse?.limit ?? 0, // Pagination limit value
        isLoading,
        isError,
    };
};
