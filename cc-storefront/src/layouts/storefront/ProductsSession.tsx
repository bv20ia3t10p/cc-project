import { useProductService } from '@/hooks/useProductService';
import { Button, Col, Row, Typography, Skeleton } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useState } from 'react';
import { useNavigate } from 'react-router';

type Props = {};

export const ProductsSection = (props: Props) => {
    const { isLoading, productSummaries } = useProductService();
    const navigate = useNavigate();
    return (
        <><Skeleton
            active={isLoading}
            paragraph={{ rows: 20 }}
            className='w-full' />
            {productSummaries.map((category) => (
                <div key={category.category} className="pt-12 mx-[10vw] mb-12 border-t-2 border-gray-200">
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold capitalize">{category.category.replace('-', ' ')}</h2>
                        <Button type="link" className="text-gray-500 hover:text-blue-500">
                            View all <h2 className='capitalize'>{category.category.toLowerCase().replace('-', ' ')}</h2>
                        </Button>
                    </div>
                    <Typography className='mb-10'>
                        {category.products[0].description}
                    </Typography>
                    {/* Swiper */}
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        slidesPerView={6} // Number of items visible per view
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 5 },
                        }}
                        className="swiper-container"
                    >
                        {category.products.map((product) => (
                            <SwiperSlide key={product.id} className="flex justify-center">
                                <Col
                                    onClick={() => {
                                        navigate(`${category.category}/${product.id}`)
                                    }}

                                    style={{
                                        cursor: 'pointer'
                                    }} className="product-card bg-white shadow-md rounded-lg p-4 w-[250px] h-[320px] mb-24">
                                    {/* Image Skeleton or Image */}
                                    <ImageWithSkeleton src={product.thumbnail} alt={product.title} />

                                    <h3 className="mb-2 text-lg font-semibold text-gray-800">{product.title}</h3>
                                    <p className="mb-2 text-gray-500">
                                        <del className="text-red-500">{`€${product.price.toFixed(2)}`}</del>
                                        {`   €${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}`}
                                    </p>
                                    <span className="absolute px-2 py-1 text-xs text-white bg-red-500 rounded-full discount-badge top-2 right-2">
                                        {`-${product.discountPercentage}%`}
                                    </span>
                                </Col>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ))}
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
                <div className="w-full h-0 rounded-md ">
                    <Skeleton.Image
                        style={{
                            height: '14em',
                            width: '16em'
                        }}
                        active={loading}
                    /></div>
            ) : null}
            <img
                src={src}
                alt={alt}
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={`w-full h-48 mb-4 rounded-md object-cover transition-opacity duration-300 ${loading || error ? 'opacity-0' : 'opacity-100'}`}
            />
        </>
    );
};
