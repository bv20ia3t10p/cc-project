import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { User } from "../models/auth/User";
import { UserApiClient } from "../utils/api/api-client/UserApiClient";
import { App } from "antd";
import { AuthApiClient } from "@/utils/api/api-client/AuthApiClient";

export const useUserService = () => {
    const { message } = App.useApp();
    const [user, setUser] = useState<User>(
        new User({
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            gender: "",
            image: "",
        })
    );
    // Instantiate the API client
    const userApiClient = new UserApiClient();
    const authApiClient = new AuthApiClient();

    // Define the mutation for creating a user
    const {
        mutate: createUser,
        isPending,
        isError,
    } = useMutation({
        mutationFn: (userData: User) => {
            message.open({
                content: "Registering your information",
                type: "loading",
                key: "regiserUser",
            });
            const data = userApiClient.createUser(userData).finally(() => {
                message.destroy("registerUser");
            });
            return data;
        },
        onSuccess: () => {
            message.success("Created user successfully");
        },
        onError: () => {
            message.error("Failed to create use");
        },
    });

    const {
        mutate: login,
        isPending: isLoggingIn,
        isError: isLoggingError,
    } = useMutation({
        mutationFn: (userData: User) => {
            message.open({
                content: "Logging in with your information",
                type: "loading",
                key: "loginUser",
            });
            const data = authApiClient.loginUser(userData).finally(() => {
                message.destroy("loginUser");
            });
            return data;
        },
        onSuccess: () => {
            message.success("Login successfully");
        },
        onError: () => {
            message.error("Login failed, check your credentials");
        },
    });

    return {
        user,
        createUser,
        setUser,
        isPending,
        isError,
        login,
        isLoggingIn,
        isLoggingError,
    };
};
