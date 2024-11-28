import Logo from "@/components/Logo";
import { IProps } from "@/interfaces/IProps";
import {
  GithubOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, Col, Input, Layout, Row, Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Link from "antd/es/typography/Link";
import React from "react";


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
                <Row justify={"space-evenly"}></Row>
              </Col>
              <Col>
                <Row className="h-full" justify={"space-between"}>
                  <Col span={8}>
                    <Badge count={5} overflowCount={99} size='default'>
                      <Button size={"large"} icon={<ShoppingCartOutlined />} />
                    </Badge>
                  </Col>
                  <Col span={8}>
                    <Button size="large" icon={<UserOutlined />} />
                  </Col>
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
