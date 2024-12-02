import React, { useEffect, useState } from "react";
import { Button, Flex, Form, Image, Input, Row, Typography } from "antd";
import useCartStore from "@/zustand/store";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import axios from "axios";
import CheckoutComponent from "./CheckoutComponent";
const paymentApi = import.meta.env["PAYMENT_API"];

export const CheckoutPage: React.FC = () => {
    const [stripePromise, setStripePromise] = useState<any>(null);

    useEffect(() => {
        const getPublishKey = async () => {
            const res = await axios.get(`${paymentApi}/publish-key`);
            const { publishKey } = res.data;
            const stripe = await loadStripe(publishKey);
            setStripePromise(stripe);
        };

        getPublishKey();
    }, []);

    const options: StripeElementsOptions = {
        mode: "payment",
        currency: "usd",
        amount: 100,
    };

    return (
        <div className="container py-10 px-[300px] mx-auto my-auto bg-grey-100">
            <Elements stripe={stripePromise} options={options}>
                <CheckoutComponent />
            </Elements>
        </div>
    );
};

export default CheckoutPage;
