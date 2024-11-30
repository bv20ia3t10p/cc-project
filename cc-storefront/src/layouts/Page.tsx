import Logo from "@/components/Logo";
import { IProps } from "@/interfaces/IProps";
import {
  GithubOutlined
} from "@ant-design/icons";
import { Col, Layout, Row, Typography } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import Link from "antd/es/typography/Link";
import React from "react";
import { AppHeader } from "./AppHeader";

const Page: React.FC<IProps> = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <AppHeader />
      <Content className="bg-white ">{children}</Content>
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

