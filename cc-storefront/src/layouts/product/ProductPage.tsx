import { useProductService } from '@/hooks/useProductService';
import { Col, Row, Skeleton, Typography, Collapse, Divider, Breadcrumb, Button } from 'antd';
import React, { useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import dayjs from 'dayjs'; // for date formatting
import { CarOutlined, DeliveredProcedureOutlined, HeartOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router';

const { Panel } = Collapse;
const { Text } = Typography;

type Props = {}

export const ProductPage = (props: Props) => {
    const { product, isLoadingProduct } = useProductService();
    console.log(product);

    // Helper function to round the average rating
    const getAverageRating = () => {
        const ratings = product?.reviews.map(review => review.rating);
        if (!ratings || ratings.length === 0) return 0;
        const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
        return average.toFixed(1); // Round to 1 decimal place
    }

    // Format date to a readable format using dayjs
    const formatDate = (date: string) => dayjs(date).format('MMMM D, YYYY h:mm A');

    const renderDimensions = () => {
        return (
            <>
                <Row><Col span={12}>Width: </Col>{product?.dimensions.width} cm </Row>
                <Row><Col span={12}>Height: </Col>{product?.dimensions.height} cm </Row>
                <Row><Col span={12}>Depth: </Col>{product?.dimensions.depth} cm </Row>
            </>
        );
    }

    const getReviews = () => {
        return (
            <>
                <Row><Col span={12}>Average Rating: </Col>{getAverageRating()} </Row>
                <Row><Col span={12}>Total Reviews: </Col>{product?.reviews.length} </Row>
            </>
        );
    }

    return (
        <>
            <Breadcrumb
                items={[
                    { title: <Link to='/'><HomeOutlined /> Home</Link> },
                    { title: <Link to={`/${product?.category}`} className='capitalize'>{product?.category.replace('-', ' ')}</Link> },
                    { title: <Link to={`/${product?.category}/${product?.id}`}>{product?.title}</Link> }
                ]}
                className='my-[2vh] mx-[10vw]' />
            <Row className='mx-[10vw]'>
                <Col span={14}>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        slidesPerView={1}
                        className="swiper-container"
                    >
                        {product?.images.map((img, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Row>
                                        <ImageWithSkeleton src={img} alt={product?.title} />
                                    </Row>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                    <Typography className='mt-4'>
                        {product?.description}
                    </Typography>
                    {/* Expandable Section for Reviews */}
                    <Collapse expandIconPosition='end' size='large' defaultActiveKey={['1']} className='my-4' bordered={false}>
                        <Panel header={
                            <Typography.Title level={2}>
                                Review Metadata
                            </Typography.Title>
                        } key="1" className='bg-white'>
                            {getReviews()}
                        </Panel>
                        <Panel header={
                            <Typography.Title level={2}>
                                Dimensions
                            </Typography.Title>
                        } key="2" className='bg-white'>
                            {renderDimensions()}
                        </Panel>
                        <Panel key='3' header={
                            <Typography.Title level={2}>
                                Metadata
                            </Typography.Title>
                        } className='bg-white'>
                            <Row><Col span={12}>Posted Date: </Col>{formatDate(product?.meta.createdAt ?? '')} </Row>
                            <Row><Col span={12}>Updated Date: </Col>{formatDate(product?.meta.updatedAt ?? '')}</Row>
                        </Panel>
                        <Panel key='4' header={
                            <Typography.Title level={2}>
                                Comments
                            </Typography.Title>
                        } className='bg-white' >

                        </Panel>
                    </Collapse>
                </Col>
                <Col span={10}>
                    <Row align={'middle'} justify={'start'} className='sticky mb-4'>
                        {product?.tags.map((t, i) =>
                            <Button className='mr-2 capitalize' key={i}>
                                {t}
                            </Button>
                        )}
                    </Row>
                    <Typography.Title level={1}>{product?.title}</Typography.Title>
                    <Row>
                        {product?.description}
                    </Row>
                    <Divider />
                    <del className='text-xl font-semibold text-gray-400 '>
                        ${product?.price}
                    </del>
                    <Typography.Title level={1} className='flex items-center mt-4 text-center'>
                        €{((product?.price ?? 1) * (1 - (product?.discountPercentage ?? 0) / 100)).toFixed(2)} <span className="p-1 ml-4 text-xl text-center text-gray-500 bg-gray-100 rounded-md">-{product?.discountPercentage}%</span>   </Typography.Title>
                    <Button type='primary' className='w-3/4 my-4' size='large'>
                        Add to cart
                    </Button>
                    <Typography className='mt-2 text-24'>
                        <DeliveredProcedureOutlined /> {product?.returnPolicy}
                    </Typography>
                    <Typography className='mt-2 text-24'>
                        <CarOutlined /> {product?.shippingInformation}
                    </Typography>
                    <Typography className='mt-2 text-24'>
                        <HeartOutlined /> {product?.warrantyInformation}
                    </Typography>
                </Col>
            </Row>
        </>
    );
}

// Component for handling image loading and error states
const ImageWithSkeleton = ({ src, alt }: { src: string; alt: string }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleImageError = () => setError(true);
    const handleImageLoad = () => setLoading(false);

    return (
        <>
            {/* Image Skeleton when loading or error */}
            {loading || error ? (
                <Skeleton.Image active={loading} />
            ) : null}
            <img
                src={src}
                alt={alt}
                onLoad={handleImageLoad}
                onError={handleImageError}
            />
        </>
    );
};
