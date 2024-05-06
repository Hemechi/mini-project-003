
"use client";

import { Footer } from "flowbite-react";

export default function FooterComponent() {
  return (
    <Footer container className="mt-10">
      <div className="w-full text-center">
        <div className="container mx-auto md:flex sm:flex-cols sm:justify-center md:justify-between items-center">
          <Footer.Brand
            href="/"
            src="favicon.ico"
            alt="Bamboo Logo"
            name="BAMBOO"
          />
          <Footer.LinkGroup>
            <Footer.Link className="hover:text-base-color-green" href="/about-us">About</Footer.Link>
            <Footer.Link className="hover:text-base-color-green" href="/dashboard">My Shop</Footer.Link>
            <Footer.Link className="hover:text-base-color-green" href="/policy">Privacy Policy</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="BAMBOO" year={2024} />
      </div>
    </Footer>
  );
}
