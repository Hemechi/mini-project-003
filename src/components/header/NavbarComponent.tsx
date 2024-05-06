"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Image,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menu } from "@/lib/definitions";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";


export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter()
  const cart = useAppSelector((state) => state.cart.products);
    let cartLength = cart?.length;

  if (pathname === "/login" || pathname === "/signup") return null;


  return (
    <Navbar isBordered
    isMenuOpen={isMenuOpen}
    onMenuOpenChange={setIsMenuOpen}>
   <NavbarContent className="sm:hidden" justify="start">
        <div className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" style={{color: 'warning'}}>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="inline-flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">{isMenuOpen ? "Close main menu" : "Open main menu"}</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
      </NavbarContent>

    <NavbarContent className="sm:hidden pr-3" justify="center">
      <NavbarBrand className="flex gap-2">
      <Image width={30} src="favicon.ico" alt="logo"></Image>
        <p className="font-bold text-inherit">
          <Link href="/">
          BAMBOO
          </Link>
        </p>
      </NavbarBrand>
    </NavbarContent>

    <NavbarContent className="hidden sm:flex gap-7" justify="center">
      <NavbarBrand className="flex gap-2">
      <Image width={30} src="favicon.ico" alt="logo"></Image>
        <p className="font-bold text-inherit">
        <Link href="/">
          BAMBOO
          </Link>
        </p>
      </NavbarBrand>
      <NavbarItem className="hover:text-base-color-green">
        <Link color="foreground" href="/about-us">
          About
        </Link>
      </NavbarItem>
      <NavbarItem className="hover:text-base-color-green">
        <Link color="foreground" href="/dashboard">
          My Shop
        </Link>
      </NavbarItem>
      <NavbarItem className="hover:text-base-color-green">
        <Link href="/policy" aria-current="page" color="warning">
          Policy
        </Link>
      </NavbarItem>
    </NavbarContent>
    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex hover:text-base-color-green">
        <button onClick={() => router.push("/cart")} className='font-normal mr-2 rounded-lg w-max text-black text-3xl hover:text-base-color-red px-3 py-2 relative'>
                    <FaCartShopping className="text-md"/>
                    {<sup
                        className="bg-base-color-green pt-1 text-white rounded-full w-6 h-6 text-xs absolute -top-1 -right-1">{cartLength}</sup>}
                </button>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} className="bg-base-color-red text-base-color-white" href="/auth/login" variant="flat">
          Login
        </Button>
      </NavbarItem>
    </NavbarContent>

    <NavbarMenu>
      {menu.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`}>
          <Link
              color="foreground"
              href={item.path}
              className={`${pathname === item.path && "font-bold hover:text-base-color-red"}`}
            >
              {
                item.title
              }
            </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  </Navbar>
  );
}
