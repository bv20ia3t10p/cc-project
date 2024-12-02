import React from "react";
import { Button, Form, Input, Row, Typography } from "antd";
import { useUserService } from "@/hooks/useUserService";
import { useForm } from "antd/es/form/Form";
import { User } from "@/models/auth/User";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";

export const LoginForm: React.FC = () => {
    const { isLoggingIn, login, user } = useUserService();
    const [form] = useForm();
    return (
        <div className="container p-8 mx-auto my-auto bg-grey-100">
            <Form
                disabled={isLoggingIn}
                form={form}
                layout="vertical"
                initialValues={user}
                className="container"
                onFinish={(values) => {
                    login(new User({ ...values }));
                }}>
                <Typography.Title>Login to continue your shopping experience</Typography.Title>
                <Form.Item label="Username or email" name="username">
                    <Input addonBefore={<UserOutlined />} placeholder="Enter username or email you filled in during the register" />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input.Password addonBefore={<KeyOutlined />} placeholder="password" />
                </Form.Item>
                <Row justify={"end"}>
                    <Form.Item
                        label={
                            <Typography>
                                Don't have an account? <Link href="/register">Create one!</Link>
                            </Typography>
                        }
                        labelAlign="right">
                        <Row justify={"end"}>
                            <Button loading={isLoggingIn} type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Row>
                    </Form.Item>
                </Row>
            </Form>
        </div>
    );
};

export default LoginForm;
