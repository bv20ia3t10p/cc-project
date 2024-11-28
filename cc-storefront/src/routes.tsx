// routes.tsx
import { lazy } from "react";
import { Outlet, useRoutes } from "react-router";

const Page = lazy(() => import("./layouts/Page"));
const RegisterForm = lazy(() => import("./layouts/register/RegisterForm"));
const LoginForm = lazy(() => import("./layouts/login/LoginForm"));

export const createRoutes = () => {
  const appRoutes = [
    {
      path: "",
      element: (
        <Page>
          <Outlet />
        </Page>
      ),
      children: [
        {
          path: "/",
          element: <LoginForm />,
        },
        {
          path: "/register",
          element: <RegisterForm />,
        },
      ],
    },
  ];
  return appRoutes;
};
