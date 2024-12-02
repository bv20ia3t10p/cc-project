import React from "react";
import { Button, Flex, Form, Image, Input, Row, Typography } from "antd";
import { DeleteOutlined, KeyOutlined, MinusOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import useCartStore from "@/zustand/store";
import { Link } from "react-router";

export const PaymentForm: React.FC = () => {
    const cartItems = useCartStore((state) => state.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const increaseQuantity = useCartStore((state) => state.increaseQuantity);
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const clearCart = useCartStore((state) => state.clearCart);

    console.log(cartItems);

    return (
        <div className="container py-10 px-[300px] mx-auto my-auto bg-grey-100 ">
            <Flex vertical gap={15}>
                <Flex>
                    <Typography.Text className="text-2xl font-bold">Cart</Typography.Text>
                </Flex>
                {cartItems.map((item) => (
                    <Flex key={item?.id} className="pl-5 pr-10 py-10 bg-gray-50 rounded-lg max-h-[300px] overflow-hidden" gap={20}>
                        <Flex className="w-[150px] h-[200px]">
                            <Image src={item?.image} className="rounded-lg" />
                        </Flex>
                        <Flex flex={1} vertical>
                            <Typography.Title level={3}>{item?.title}</Typography.Title>
                            <Flex gap={5} vertical>
                                <Typography.Text className="text-base">${item?.price}</Typography.Text>
                                <Typography.Text className="text-base">Total: ${item?.price * item?.quantity}</Typography.Text>
                                {/* <Typography.Text className="text-base">${item?.price}</Typography.Text> */}
                                {/* <Flex gap={20} align="center">
                                    <Typography.Text className="text-base">Savings: €6.00</Typography.Text>
                                    <Typography.Text className="text-base bg-gray-300 px-3 py-1 rounded font-medium">26%</Typography.Text>
                                </Flex> */}
                            </Flex>
                        </Flex>
                        <Flex vertical align="center" gap={5} justify="center">
                            <Button size="large" color="default" variant="text" icon={<PlusOutlined />} className="text-black" onClick={() => increaseQuantity(item?.id)} />
                            <Typography.Text className="text-lg font-bold">{item?.quantity}</Typography.Text>
                            {item?.quantity > 1 && <Button size="large" color="default" variant="text" icon={<MinusOutlined />} className="text-black" onClick={() => decreaseQuantity(item?.id)} />}
                            <Button size="large" color="default" variant="text" icon={<DeleteOutlined />} className="text-black" onClick={() => removeFromCart(item?.id)} />
                        </Flex>
                    </Flex>
                ))}
                <Flex gap={10}>
                    <Flex vertical className="pl-5" gap={10} flex={1}>
                        <Flex gap={10} vertical className="bg-gray-50 rounded-lg px-4 py-3">
                            <Typography.Text className="font-medium">Coupon Code</Typography.Text>
                            <Input></Input>
                        </Flex>
                        <Button color="default" variant="solid" className="w-[110px] h-[40px]">
                            Use Voucher
                        </Button>
                    </Flex>
                    <Flex vertical gap={10} className="p-4 w-[250px]">
                        <Flex justify="space-between">
                            <Typography.Text type="secondary" className="">
                                Savings
                            </Typography.Text>
                            <Typography.Text type="secondary" className="">
                                $0.00
                            </Typography.Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Typography.Text type="secondary" className="">
                                Tax Amount
                            </Typography.Text>
                            <Typography.Text type="secondary" className="">
                                $0.00
                            </Typography.Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Typography.Text className="text-lg font-bold">To pay</Typography.Text>
                            <Typography.Text className="text-lg font-bold">${totalPrice.toFixed(2)}</Typography.Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex justify="space-between" className="pt-5">
                    <Button color="default" variant="filled" className="w-[70px] h-[48px] font-bold bg-gray-50">
                        Back
                    </Button>
                    <Button color="default" variant="solid" className="w-[150px] h-[48px] font-bold">
                        <Link to="checkout">Checkout</Link>
                    </Button>
                </Flex>
            </Flex>
        </div>
    );
};

export default PaymentForm;
