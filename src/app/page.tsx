"use client"
import React, { useState } from 'react';
import CardComponent from '@/components/cards/CardComponent';
import { ProductType } from '@/lib/definitions';
import LoadingComponent from './loading';
import { Suspense } from 'react';
import { Pagination } from "@nextui-org/react";
import { cn, PaginationItemType } from "@nextui-org/react";
import PolicyComponent from '@/components/cards/PolicyComponent';
import { ChevronIcon } from './ChevronIcon';
import Link from 'next/link';
import HeroBannerComponent from '@/components/hero/HeroBannerComponent';
import SponsorComponent from '@/components/sponsor/SponsorComponent';
import AboutCardComponent from '@/components/cards/AboutCardComponent';
import AttractionComponent from '@/components/cards/AttractionComponent';
import { Button } from 'flowbite-react';
import { useGetProductsQuery } from '@/redux/service/ecommerce';
import { useAppDispatch } from '@/redux/hooks';
import { increment } from '@/redux/features/counter/counterSlice';
import { addToCart } from '@/redux/features/cart/cartSlice';


export default function Home() {
  // const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useGetProductsQuery({
    page: 1,
    pageSize: 8,
  })
  const products = data?.results ?? [];
  // const fetchProduct = async (page:Number) => {
  //   const product = await fetch(`https://store.istad.co/api/products/?page=${page}&page_size=8`, {
  //     cache: "no-store"
  //   });
  //   const res = await product.json();
  //   return res.results;
  // }
  // const useEffect(() => {
  //   fetchData(currentPage);
  // }, [currentPage]);

  // const fetchData = async (page: Number) => {
  //   try {
  //     setLoading(true);
  //     const productsData = await fetchProduct(page);
  //     setProduct(productsData);
  //   } catch (error) {
  //     console.error("Error fetching product data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const renderItem = ({
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: any) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button key={key} className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")} onClick={onNext}>
          <ChevronIcon className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button key={key} className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")} onClick={onPrevious}>
          <ChevronIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return <button key={key} className={className}>...</button>;
    }
    return (
      <Button
        key={key}
        className={cn(
          className,
          isActive &&
          "text-white bg-gradient-to-br from-base-color-red to-pink-500 font-bold",
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </Button>
    );
  };

  return (
    <>
      <HeroBannerComponent />
      <SponsorComponent />
      <section className='my-5 container mx-auto'>
        <div className='flex justify-center pb-5 w-full' id="items">
          <h1 className='mt-7 text-3xl font-bold'>Popular Products</h1>
        </div>
        <div className="mt-[20px] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-8 container">
          <Suspense fallback={<LoadingComponent />}>
            {!isLoading && products.map((pro: ProductType) => (
              <Link href={`/product/${pro.id}`} key={pro.id}>
                <CardComponent
                  id={pro.id}
                  name={pro.name}
                  price={pro.price}
                  image={pro.image}
                  quantity={pro.quantity}
                  category={pro.category}
                />
              </Link>
            ))}
            <div className='flex justify-center md:flex-none'>
              <Pagination
                disableCursorAnimation
                showControls
                total={8}
                initialPage={1}
                className="gap-2"
                radius="full"
                renderItem={renderItem}
                variant="light"
                onChange={setCurrentPage}
              />
            </div>
          </Suspense>
        </div>
      </section>
      <section className='my-5 container mx-auto'>
        <div className='flex justify-center pb-5 w-full' id="items">
          <AboutCardComponent />
        </div>
      </section>
      <section className='mt-10'>
        <div className='flex justify-center pb-5 w-full'>
          <AttractionComponent />
        </div>
      </section>
      <section>
        <div className='flex justify-center pb-5 w-full'>
          <PolicyComponent />
        </div>
      </section>
    </>
  );
}
