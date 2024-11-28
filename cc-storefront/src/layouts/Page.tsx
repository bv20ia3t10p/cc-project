import {
  Badge,
  Button,
  Col,
  Input,
  Layout,
  Row,
  Space,
  Typography,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Logo from "../components/Logo";
import {
  GithubOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import React from "react";
import { IProps } from "../interfaces/IProps";

const Page: React.FC<IProps> = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <Header
        style={{ backgroundColor: "white", display: "flex", height: "10vh" }}
        className="w-full border-b-2 border-gray-200"
      >
        <Row align={"middle"} className="w-full">
          <Col span={2}>
            <Row align={"middle"}>
              <Logo />
            </Row>
          </Col>
          <Col span={8}>
            <Row align={"middle"}>
              <Input.Search
                inputMode="search"
                className="h-full"
                allowClear
                placeholder="input search text"
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={() => {}}
              />
            </Row>
          </Col>
          <Col span={14}>
            <Row justify={"space-between"}>
              <Col className="pl-12">
                <Row justify={"space-evenly"}>
                </Row>
              </Col>
              <Col>
                <Row className="h-full" justify={"space-evenly"}>
                  <Badge count={5} overflowCount={99} size="small">
                    <Button
                      className="text-4xl"
                      type="text"
                      icon={<ShoppingCartOutlined />}
                    />
                  </Badge>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>
      <Content className="py-12 bg-white">{children}</Content>
      <Footer>
        <Row>
          <Col span={20}>
            <Row className="w-24">
              <Logo />
            </Row>
            <Typography.Text>
              Application developed for Vietnam National University - University
              of Information Technology
              <br /> Made with ReactTS and .NET
            </Typography.Text>
          </Col>
          <Col span={4}>
            <Typography.Text>
              Project connections:
              <br />
              <Link href="https://github.com/bv20ia3t10p/cc-project">
                <GithubOutlined />
                {"\t"}Project repository
              </Link>
            </Typography.Text>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default Page;
