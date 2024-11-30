import { Outlet } from "react-router";
import Page from "./layouts/Page";
import LoginForm from "./layouts/login/LoginForm";
import RegisterForm from "./layouts/register/RegisterForm";
import { StoreFront } from "./layouts/storefront/StoreFront";
import { ProductPage } from "./layouts/product/ProductPage";

export const createRoutes = () => {
  const appRoutes = [
    {
      path: "/",
      element: (
        <Page>
          <Outlet />
        </Page>
      ),
      children: [
        {
          path: "",
          index: true,
          element: <StoreFront />, // Home or storefront page
        },
        {
          path: "login",
          element: <LoginForm />, // Login form page
        },
        {
          path: "register",
          element: <RegisterForm />, // Register form page
        },
        {
          path: ":category/:productId", // Dynamic route for category and product ID
          element: <ProductPage />
        }
      ],
    },
  ];

  return appRoutes;
};
