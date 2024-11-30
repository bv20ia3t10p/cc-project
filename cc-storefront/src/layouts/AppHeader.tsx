import Logo from '@/components/Logo';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Row, Col, Input, Typography, Badge, Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Link } from 'react-router';

type Props = {}

export const AppHeader = (props: Props) => {
    return <Header
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
                        onSearch={() => { }} />
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
                            <Link to={''}>
                                <Typography>Home</Typography>
                            </Link>
                            <Link to={''}>
                                <Typography>Products</Typography>
                            </Link>
                            <Link to={''}>
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
    </Header>;


}