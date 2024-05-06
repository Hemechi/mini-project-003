import { ProductType } from '@/lib/definitions'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function DetailCard({image, name,desc, category, price, onClick }:ProductType) {
  return (
    <section className='grid md:grid-cols-2 grid-cols-1 gap-5 container mx-auto md:pt-10 '>
        <div className='w-full h-auto flex items-center justify-center'>
          <Image width={1000} height={1000} src={image} alt="productDetail.name" />
        </div>
        <div className='px-7'>
          <div className='bg-base-color-green w-auto h-auto text-center rounded-lg px-3'>
            <h1 className='text-[24px] text-black font-bold mb-3'>{name}</h1>
          </div>
          <span className="bg-base-color-red text-base-color-white text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{category}</span>
          <p className='mt-2'>{desc}</p>
          <div>
            <p className='my-4 text-xl md:text-xl lg:text-2xl font-semibold text-base-color-red dark:text-white'>${price}</p>
          </div>
          <button onClick={onClick} className='flex justify-evenly mb-3 bg-base-color-green hover:bg-base-color-red rounded-lg p-3 text-white lg:w-1/3 w-2/3'>
            <span>Add to cart</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </button>
          <Link className='hover:text-base-color-green' href="/">&lt;- <span className='underline'>Go Back</span></Link>
        </div>
      </section>
  )
}
