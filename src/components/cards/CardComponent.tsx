import React from "react";
import { Card, CardFooter, CardBody, Image } from "@nextui-org/react";
import { ProductType } from "@/lib/definitions";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { increment } from "@/redux/features/counter/counterSlice";
import { FaCartPlus } from "react-icons/fa6";

export default function CardComponent({id, name, image, price}: ProductType) {
  
  const dispatch = useAppDispatch();

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent default button behavior
        e.stopPropagation(); // Prevent event propagation
        dispatch(increment());
        dispatch(addToCart({id, name, image, price}));
    }


  return (
    <>
      <div className="flex flex-wrap container justify-center">
        <Card isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0 w-72">
            <button onClick={handleAddToCart} className="absolute top-0 z-10 bg-base-color-white m-3 px-3 p-2 rounded-full">
              <FaCartPlus/>
            </button>
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              className="w-full h-60 p-0 object-cover relative z-0"
              src={image}
              alt=""
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{name}</b>
            <p className="text-default-500">${price}</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
