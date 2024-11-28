import {
  HomeOutlined,
  KeyOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Splitter, Typography } from "antd";
import { useEffect } from "react";
import { usePageLayout } from "../../hooks/usePageLayout";
import { useUserService } from "../../hooks/useUserService";
import Page from "../Page";
import Link from "antd/es/typography/Link";
import { User } from "@/models/auth/User";

const RegisterForm: React.FC = () => {
  const { user, createUser, isPending } = useUserService();
  const { hideHeader } = usePageLayout();
  const [form] = Form.useForm();
  useEffect(() => {
    hideHeader();
  }, [hideHeader]);
  return (
    <div className="container max-w-2xl p-8 mx-auto bg-white shadow-xl">
      <Form
        disabled={isPending}
        form={form}
        layout="vertical"
        initialValues={user}
        className="container"
        onFinish={(values) => {
          createUser(new User({ ...values }));
        }}
      >
        <Typography.Title level={3}>
          Welcome, register to get started!
        </Typography.Title>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please input your username!" },
            {
              min: 8,
              message: "Username must be at least 8 characters long!",
            },
          ]}
        >
          <Input
            placeholder="Enter your username"
            addonBefore={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input
            placeholder="Enter your email"
            type="email"
            addonBefore={<MailOutlined />}
          />
        </Form.Item>

        <Splitter className="max-w-full">
          <Col span={12} className="mr-1">
            <Form.Item label="First name" name="firstName">
              <Input placeholder="Enter your first name" />
            </Form.Item>
          </Col>
          <Col span={12} className="ml-1">
            <Form.Item label="Last name" name="lastName">
              <Input placeholder="and your last name" />
            </Form.Item>
          </Col>
        </Splitter>
        <Form.Item label="Address" name="address">
          <Input
            placeholder="Enter your shipping address"
            addonBefore={<HomeOutlined />}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            {
              min: 6,
              message: "Password must be at least 6 characters long!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Enter your password"
            addonBefore={<KeyOutlined />}
          />
        </Form.Item>
        <Form.Item
          label="Confirm your password"
          name="confirmPassowrd"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm your password"
            addonBefore={<KeyOutlined />}
          />
        </Form.Item>
        <Row justify={"end"}>
          <Form.Item
            label={
              <Typography>
                Already got an account? Redirect me to{" "}
                <Link href="/login">login page</Link>
              </Typography>
            }
            labelAlign="right"
          >
            <Row justify={"end"}>
              <Button loading={isPending} type="primary" htmlType="submit">
                Register
              </Button>
            </Row>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

export default RegisterForm;
