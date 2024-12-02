import { useEffect, useState } from "react";
import { Button, Flex, Form, Image, Input, Row, Typography } from "antd";
import useCartStore from "@/zustand/store";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
const paymentApi = "https://simplesocialds.me/stripe";

export const CheckoutComponent: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const clearCart = useCartStore((state) => state.clearCart);
    const cartItems = useCartStore((state) => state.cartItems);
    const [errorMessage, setErrorMessage] = useState<any>("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (elements == null || stripe == null) {
            return;
        }

        const { error: submitError } = await elements.submit();
        if (submitError?.message) {
            setErrorMessage(submitError.message);
            return;
        }

        // Create the PaymentIntent and obtain clientSecret from your server endpoint
        const res = await axios.post(`${paymentApi}/payment`, { cart: cartItems });
        const { clientSecret: clientSecret } = await res.data;
        clearCart();

        const { error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}/success`,
            },
        });

        if (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="flex flex-col px-4">
            <PaymentElement />
            <Button onClick={handleSubmit} className="mt-5 self-end w-[100px] h-[40px] font-semibold" type="primary" variant="solid">
                Pay
            </Button>
            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
        </div>
    );
};

export default CheckoutComponent;
