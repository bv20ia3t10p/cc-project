import { Outlet } from "react-router";
import Page from "./layouts/Page";
import LoginForm from "./layouts/login/LoginForm";
import RegisterForm from "./layouts/register/RegisterForm";
import { StoreFront } from "./layouts/storefront/StoreFront";
import { ProductPage } from "./layouts/product/ProductPage";
import PaymentForm from "./layouts/payment/PaymentPage";
import CheckoutPage from "./layouts/payment/CheckoutPage";
import PaymentSuccess from "./layouts/payment/PaymentSuccess";

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
                    element: <ProductPage />,
                },
                {
                    path: "payment", // Dynamic route for category and product ID
                    element: <PaymentForm />,
                },
                {
                    path: "payment/checkout", // Dynamic route for category and product ID
                    element: <CheckoutPage />,
                },
                {
                    path: "success",
                    element: <PaymentSuccess />,
                },
            ],
        },
    ];

    return appRoutes;
};
