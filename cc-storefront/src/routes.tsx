// routes.tsx
import { Outlet } from "react-router";
import Page from "./layouts/Page";
import LoginForm from "./layouts/login/LoginForm";
import RegisterForm from "./layouts/register/RegisterForm";

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
