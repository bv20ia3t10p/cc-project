import { useCategoryService } from '@/hooks/useCategoryService'
import { Category } from '@/models/Category'
import { Button, Col, Row, Skeleton, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'

type Props = {}

export const CategoriesSection = () => {
  const { categories, isLoading, isError } = useCategoryService();
  return (
    <Row className='flex-col ml-[10vw]'>
      <Row className='mt-2'>
        <Typography.Title level={3}>
          Browse categories
        </Typography.Title>
      </Row>
      <Row justify={'space-between'} align={'middle'} className='w-7/12 mb-12'>
        {
          !isLoading ? categories.map((category, index) => {
            if (index > 5) {
              return;
            }
            return <Col key={index}>
              <Button type='text' style={{
                height: 40,
                width: 130,
                marginTop: '1rem'
              }}
                className='bg-gray-500 text-gray-50 '
              >
                {category.name}
              </Button>
            </Col>
          }) : [1, 2, 3, 4, 5].map((_value, index) => {
            return <Col key={index} ><Skeleton.Node active={true} style={{
              width: 120,
              height: 40
            }} /></Col>
          })
        }
      </Row>
    </Row>
  )
}