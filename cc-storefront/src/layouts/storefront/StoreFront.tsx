import { Breadcrumb, Button, Col, Row, Typography } from "antd";
import React from "react";
import { Banner } from "./Banner";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router";

export const StoreFront: React.FC = () => {
  return (
    <>
      <Banner />
      <Breadcrumb className="mx-20 my-4">
        <BreadcrumbItem>
          <Link to='/'>
            <Typography>
              <HomeOutlined /> Home
            </Typography>
          </Link>
        </BreadcrumbItem>
      </Breadcrumb>
      
    </>
  );
};


