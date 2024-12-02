import { useProductService } from '@/hooks/useProductService';
import { useReviewService } from '@/hooks/useReviewService';
import { Review } from '@/models/products/Product';
import { Environment } from '@/utils/env/Environment';
import { CalendarOutlined, CarOutlined, DeliveredProcedureOutlined, HeartOutlined, HomeOutlined, MailOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { App, Breadcrumb, Button, Col, Collapse, Divider, Form, Rate, Row, Skeleton, Typography, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs'; // for date formatting
import { useState } from 'react';
import { Link } from 'react-router';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const { Panel } = Collapse;
const { Text } = Typography;

type Props = {}

export const ProductPage = (props: Props) => {
    const { product } = useProductService();
    console.log(product);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [image, setImage] = useState<any>(null);
    const { postReview } = useReviewService();
    const { message } = App.useApp();

    // Handle form submission
    const handleSubmit = async () => {
        if (!rating || !comment) {
            message.error("Rating and comment are required.");
            return;
        }

        if (image?.fileList?.length) {
            let uploadedImages: string = '';
            for (const file of image.fileList) {
                const formData = new FormData();
                formData.append("file", file.originFileObj); // Use `originFileObj` for the raw file object
                message.open({
                    key: 'postingImage',
                    content: 'Posting your review with image',
                    type: 'loading'
                })
                try {
                    const response = await fetch(
                        `${Environment.getEnvVariable('IMAGE_SERVICE')}/upload`,
                        {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('account')
                                    ? JSON.parse(localStorage.getItem('account') ?? "{}").accessToken
                                    : ""
                                    }`,
                            },
                            body: formData,
                        }
                    );

                    if (!response.ok) {
                        throw new Error(`Upload failed with status ${response.status}`);
                    }
                    message.success('Upload image successfully');
                    const data = await response.json();
                    uploadedImages = data.imageUrl // Adjust this key based on API response
                } catch (error) {
                    console.error("Image upload failed:", error);
                    message.error("Failed to upload image. Please try again.");
                    return; // Stop further execution if image upload fails
                }
            }
            message.destroy('postingImage');
            // Proceed to submit the review
            const review = new Review({
                rating,
                comment,
                images: uploadedImages,
                reviewerName: "John Doe", // Replace with actual user data
                reviewerEmail: "john.doe@example.com", // Replace with actual user email
                date: new Date().toISOString(),
            });

            try {
                await postReview({ productId: product?.id ?? 0, review });
                message.success("Review submitted successfully!");
                setRating(0);
                setComment("");
                setImage(null);
            } catch (error) {
                console.error("Failed to submit review:", error);
                message.error("Failed to submit review.");
            }
        } else {
            message.error("Please upload at least one image.");
        }
    };
    // Helper function to round the average rating
    const getAverageRating = () => {
        const ratings = product?.reviews.map(review => review.rating);
        if (!ratings || ratings.length === 0) return 0;
        const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
        return average.toFixed(1); // Round to 1 decimal place
    };

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
    };

    const getReviews = () => {
        return (
            <>
                <Row><Col span={12}>Average Rating: </Col>{getAverageRating()} </Row>
                <Row><Col span={12}>Total Reviews: </Col>{product?.reviews.length} </Row>
            </>
        );
    };

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
                        <Panel key='4' header={
                            <Typography.Title level={2}>
                                Comments
                            </Typography.Title>
                        } className='bg-white'>
                            {product?.reviews.map((r, i) => <Row key={i} className='mb-6'>
                                <Col>
                                    <Row>
                                        <UserOutlined className='mr-2' />{r.reviewerName}
                                    </Row>
                                    <Row>
                                        <MailOutlined className='mr-2' />{r.reviewerEmail}
                                    </Row>
                                    <Row>
                                        <CalendarOutlined className='mr-2' />{formatDate(r.date)}
                                    </Row>
                                    <Rate disabled className='my-2' value={r.rating} />
                                    <Row>
                                        {r.images ? <ImageWithSkeleton src={r.images ?? ""} alt={'Review image'} /> : <></>}
                                    </Row>
                                    <Row>{r.comment}</Row>
                                </Col>
                            </Row>)}
                            <Row>
                                <Col>
                                    <Form>
                                        <Typography.Title level={3}>
                                            Add your own comment
                                        </Typography.Title>
                                        <Row>
                                            <Rate value={rating} onChange={setRating} />
                                        </Row>
                                        <TextArea className='mt-4' size='large' onChange={(e) => setComment(e.target.value)} />
                                        <Row className='mt-4'>
                                            <Upload
                                                listType="picture"
                                                beforeUpload={(file) => {
                                                    setImage({ fileList: [file] });
                                                    return false; // Prevent auto upload
                                                }}
                                                onChange={({ fileList }) => setImage({ fileList })}
                                                showUploadList={{ showRemoveIcon: true }}
                                                accept="image/*"
                                                maxCount={1}
                                            >
                                                <Button icon={<UploadOutlined />}>Upload Image</Button>
                                            </Upload>
                                        </Row>
                                        <Row className='mt-4'>
                                            <Button type="primary" onClick={handleSubmit}>Submit Review</Button>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
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
                    <Row>{product?.description}</Row>
                    <Divider />
                    <del className='text-xl font-semibold text-gray-400 '>
                        ${product?.price}
                    </del>
                    <Typography.Title level={1} className='flex items-center mt-4 text-center'>
                        €{((product?.price ?? 1) * (1 - (product?.discountPercentage ?? 0) / 100)).toFixed(2)}
                        <span className="p-1 ml-4 text-xl text-center text-gray-500 bg-gray-100 rounded-md">-{product?.discountPercentage}%</span>
                    </Typography.Title>
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
};

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
