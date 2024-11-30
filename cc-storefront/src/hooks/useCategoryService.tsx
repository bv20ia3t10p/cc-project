import { Category } from "@/models/Category";
import { CategoryApiClient } from "@/utils/api/api-client/CategoryApiClient";
import { useQuery } from "@tanstack/react-query";
import { App } from "antd";

export const useCategoryService = () => {
    const { message } = App.useApp();
    const apiClient = new CategoryApiClient();

    const { data: categories, isLoading, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: () => apiClient.getAllCategories(),
        retry: false, // Optional: Disable retries if desired
        staleTime: 300000, // Optional: Cache data for 5 minutes
    });
    if (isError) {
        message.error("Failed to get categories");
    }
    return {
        categories: categories ?? [], // Default to an empty array if undefined
        isLoading,
        isError,
    };
};
