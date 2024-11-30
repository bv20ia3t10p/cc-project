import { useProductService } from '@/hooks/useProductService';
import { Button, Col, Row, Typography } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle'; // Import Swiper 
type Props = {}

export const ProductsSection = (props: Props) => {
    const { productSummaries } = useProductService();
    return (
        <>
            {productSummaries.map((category) => (
                <div key={category.category} className="pt-12 mx-48 mb-12 border-t-2 border-gray-200">
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold capitalize">{category.category}</h2>
                        <Button type="link" className="text-gray-500 hover:text-blue-500">
                            View all <h2 className='capitalize'>{category.category.toLowerCase()}</h2>
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
                        spaceBetween={30}
                        slidesPerView={4} // Number of items visible per view
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="swiper-container"
                    >
                        {category.products.map((product) => (
                            <SwiperSlide key={product.id} className="flex justify-center">
                                <Col className="product-card bg-white shadow-md rounded-lg p-4 w-full max-w-[250px] h-[320px] mb-24">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="w-full h-48 mb-4 rounded-md object-fit"
                                    />
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
    )
}
