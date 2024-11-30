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
          {/* Icon */}
          <Col span={2}>
            <Row align={"middle"}>
              <Logo />
            </Row>
          </Col>
          {/* Search bar */}
          <Col span={6}>
            <Row align={"middle"}>
              <Input.Search
                inputMode="search"
                className="h-full"
                allowClear
                placeholder="Search for products, names, brands,... "
                enterButton={<SearchOutlined />}
                type="outlined"
                size="middle"
                onSearch={() => {}}
              />
            </Row>
          </Col>
          {/* Other items */}
          <Col span={16}>
            <Row justify={"space-evenly"} align={"middle"} className="h-full">
              <Col
                span={16}
                xs={{
                  span: 14,
                }}
                xl={{
                  span: 4,
                }}
                style={{
                  marginLeft: "6px",
                }}
              >
                <Row justify={"space-evenly"}>
                  <Link>
                    <Typography>Home</Typography>
                  </Link>
                  <Link>
                    <Typography>Products</Typography>
                  </Link>
                  <Link>
                    <Typography>About</Typography>
                  </Link>
                </Row>
              </Col>
              <Col
                span={0}
                xl={{
                  span: 14,
                }}
              ></Col>
              <Col>
                <Row className="h-full" justify={"space-between"}>
                  <Col span={8}>
                    <Badge count={5} overflowCount={99} size="default">
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
