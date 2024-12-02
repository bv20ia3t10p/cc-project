import Logo from '@/components/Logo';
import { useUserService } from '@/hooks/useUserService';
import { SearchOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Row, Col, Input, Typography, Badge, Button, Dropdown, Menu, Avatar } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Link, useNavigate } from 'react-router';

type Props = {}

export const AppHeader = (props: Props) => {
    const { isLoggedIn, user } = useUserService();
    const navigate = useNavigate();
    return <Header
        style={{ backgroundColor: "white", display: "flex", height: "10vh" }}
        className="w-full px-[10vw] border-b-2 border-gray-200"
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
                                {isLoggedIn ?
                                    <Dropdown overlay={<Menu >
                                        <Menu.Item key="1" onClick={() => alert('Change Account Info')}>
                                            Change Account Information
                                        </Menu.Item>
                                        <Menu.Item key="2" onClick={() => {
                                            localStorage.clear();
                                            window.location.reload();
                                        }}>
                                            Log Out
                                        </Menu.Item>
                                    </Menu>} trigger={['click']}>
                                        <Button size="large" icon={<SettingOutlined />} />
                                    </Dropdown>
                                    : <Button size="large" onClick={() => {
                                        navigate('/login');
                                    }} icon={<UserOutlined />} />
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Header>;


}