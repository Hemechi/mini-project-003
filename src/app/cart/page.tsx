"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
	selectProducts,
	selectTotalPrice,
} from "@/redux/features/cart/cartSlice";
import { removeFromCart } from "@/redux/features/cart/cartSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Cart() {
	const { data: session } = useSession();
	const products = useAppSelector(selectProducts);
	const totalPrice = useAppSelector(selectTotalPrice);

	const dispatch = useAppDispatch();

	return (
		<>
		{session ? (
			<main className="container mx-auto py-5">
				{products.length == 0 && <h1 className="text-5xl w-full h-screen flex justify-center items-center">Cart is Empty!</h1>}
				{products.length !== 0 && (
					<div className="sm:px-5 md:px-10 lg:px-0">
						<h1 className="text-3xl font-medium">
							Total Product: {" "}
							<span className="text-base-color-green font-normal">{products.length}</span>
						</h1>
						<h2 className="text-2xl font-bold">
							Total Price: <span className="text-base-color-green font-normal">${totalPrice}</span>
						</h2>
					</div>
				)}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:gap-5 md:gap-10 md:mt-8 sm:mt-5 sm:px-5 md:px-10 lg:px-0">
					{products.length !== 0 &&
						products.map((product) => (
							<div
								className="flex justify-between bg-white shadow-xl my-4 p-4 rounded-xl"
								key={product.id}
							>
								<div>
									<h1>{product.name}</h1>
									<h2 className="text-base-color-red py-3">${product.price}</h2>
									<Image
										width={100}
										height={100}
										src={product.image}
										alt={product.name}
									/>
								</div>
								<div>
									<button
										onClick={() => dispatch(removeFromCart(product.id))}
										className="bg-red-500 text-white p-2 rounded-xl"
									>
										Remove
									</button>
								</div>
							</div>
						))}
				</div>
			</main>
			) : (
				<div className="w-full h-screen flex flex-col justify-center text-5xl items-center">
					Unauthorize!
				</div>
			)}
		</>

	);
}
