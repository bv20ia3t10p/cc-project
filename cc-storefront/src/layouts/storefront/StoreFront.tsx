import { Breadcrumb, Button, Col, Row, Typography } from "antd";
import React from "react";
import { Banner } from "./Banner";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { CategoriesSection } from "./CategoriesSection";
import { ProductsSection } from "./ProductsSession";

export const StoreFront: React.FC = () => {
    return (
        <>
            <Banner />
            <Breadcrumb
                className="mt-5 ml-[10vw]"
                items={[
                    {
                        title: (
                            <>
                                <HomeOutlined /> Home
                            </>
                        ),
                        breadcrumbName: "Home",
                        path: "/",
                    },
                    { title: "Products", breadcrumbName: "Products", path: "/" },
                ]}
            />
            <CategoriesSection />
            <ProductsSection />
        </>
    );
};
