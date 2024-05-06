import React from "react";
import Image from "next/image";

export default function AttractionComponent() {
    return (
        <>
            <div className="w-full bg-gradient-to-br from-pink-500 to-base-color-red">
                <div className="container mx-auto lg:flex text-white grid md:grid-cols-2 sm:grid-cols-1 sm:gap-6 md:gap-0">
                    <div className="flex items-center p-7">
                        <div>
                        <p className="text-3xl font-bold pb-1">
                        Shop Smarter, Shop Better
                        </p> <br />
                    <p>
                        Experience the future of online shopping with Bamboo. Discover endless possibilities, unbeatable deals, and unparalleled convenience—all in one place. Start exploring today and unlock a world of endless shopping possibilities at your fingertips!
                    </p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Image width={300} height={600} src={"/assets/pic.png"} alt="" />
                    </div>
                    
                </div>
                
            </div>
        </>
    );
}
