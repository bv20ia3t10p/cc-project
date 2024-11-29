// routes.tsx
import { Outlet } from "react-router";
import Page from "./layouts/Page";
import LoginForm from "./layouts/login/LoginForm";
import RegisterForm from "./layouts/register/RegisterForm";
import { StoreFront } from "./layouts/storefront/StoreFront";

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
          element: <StoreFront />,
        },
        {
          path: "login",
          element: <LoginForm />,
        },
        {
          path: "register",
          element: <RegisterForm />,
        },
      ],
    },
  ];
  return appRoutes;
};
