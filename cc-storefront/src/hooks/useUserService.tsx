import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { User } from "../models/auth/User";
import { UserApiClient } from "../utils/api/api-client/UserApiClient";
import { App } from "antd";
import { AuthApiClient } from "@/utils/api/api-client/AuthApiClient";
import { useNavigate } from "react-router";

export const useUserService = () => {
  const { message } = App.useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(
    new User({
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      gender: "",
      image: "",
      address: ""
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
        key: "registerUser",
      });
      const data = userApiClient.createUser(userData).finally(() => {
        message.destroy("registerUser");
      });
      return data;
    },
    onSuccess: () => {
      message.success("Created user successfully");
      navigate("/login");
    },
    onError: () => {
      message.error("Failed to create use");
    },
  });

  const {
    mutate: login,
    isPending: isLoggingIn,
    isError: isLoggingError,
    isSuccess
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
      localStorage.setItem('account', JSON.stringify(data));
      return data;
    },
    onSuccess: (data) => {
      message.success("Login successfully");
      localStorage.setItem('account', JSON.stringify(data));
      setIsLoggedIn(true);
      navigate('/');
    },
    onError: () => {
      message.error("Login failed, check your credentials");
    },
  });

  useEffect(() => {
    if (!isSuccess) return;
    const account = localStorage.getItem('account');
    if (account) {
      setIsLoggedIn(true);
      setUser(JSON.parse(account));
    }
  }, [isSuccess]);

  return {
    user,
    createUser,
    setUser,
    isPending,
    isError,
    login,
    isLoggingIn,
    isLoggingError,
    isLoggedIn,
    isSuccess
  };
};
