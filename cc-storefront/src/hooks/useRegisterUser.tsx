import { useEffect, useState } from "react";
import { User } from "../models/auth/User";
import { UserApiClient } from "../utils/api/api-client/UserApiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";

export const useRegisterInfo = () => {
  const [messageApi,] = message.useMessage();
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
  const apiClient = new UserApiClient();

  // Define the mutation for creating a user
  const {
    mutate: createUser,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (userData: User) => {
      messageApi.open({
        key: "registerUser",
        type: "loading",
        content: "Creating an user for you",
      });
      const data = apiClient.createUser(userData);
      console.log(data);
      return data;
    },
    onSuccess: () => {
      messageApi.open({
        key: "registerUser",
        type: "success",
        content: "User created successfully, thank you!",
      });
    },
    onError: (error) => {
      messageApi.open({
        key: "registerUser",
        type: "error",
        content: `Failed to create user: ${error.message}`,
      });
    },
  });


  return { user, createUser, setUser, isPending, isError };
};
