"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addToCart, selectProducts } from '@/redux/features/cart/cartSlice'
import { increment } from '@/redux/features/counter/counterSlice'
import { ProductType } from '@/lib/definitions'
import { useGetProductByIdQuery } from '@/redux/service/ecommerce'
import LoadingComponent from '@/app/loading'
import DetailCard from '@/components/cards/DetailCard'

type ParamProps = {
  params: {
    id: number
  }
}

async function DetailPage({ params }: ParamProps) {
  const id = params.id
  // const [productDetail, setProductDetail] = React.useState<ProductType | null>(null)
  const dispatch = useAppDispatch()
  const {data:product, isLoading, error} = useGetProductByIdQuery(id)

  if (!product) return <div>No product found.</div>;

    const {name, image, price, desc, category} = product;

    const handleAddToCart = () => {
        dispatch(increment())
        dispatch(addToCart({ id, name, price, image }));
    }

    if (isLoading) return <div><LoadingComponent/></div>;

    if (error) { // @ts-ignore
        return <div>Error: {error.message}</div>;
    }

    if (!product) return <div><LoadingComponent/></div>;

  return (
    <main>
      <DetailCard
                    id={id}
                    name={name}
                    price={price}
                    desc={desc}
                    image={image}
                    category={category}
                    onClick={handleAddToCart}
                />
    </main>
  )
}

export default DetailPage
