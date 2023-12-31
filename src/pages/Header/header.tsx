import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import Mobilemenu from "@/components/mobilemenu";

export default function Header() {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

  const MobileMenu: any = useRef();

  const handleShowingMenu = () => {
    setMobileMenuOpened(true);
  };
  return (
    <div className="fixed z-40 h-[50px] w-screen bg-black  border-gray-900 px-[20px] flex items-center justify-center ">
      <div className="w-[1100px] flex items-center justify-between ">
        <div>
          <Link href="/">
            <Image
              src="/Logo.png"
              width={90}
              height={90}
              alt="taxi_krakow"
            ></Image>
          </Link>
        </div>
        <RxHamburgerMenu
          className="lg:hidden text-yellow-500 w-[30px] h-[30px]"
          onClick={handleShowingMenu}
        />
        <div
          ref={MobileMenu}
          className={
            mobileMenuOpened === false
              ? "absolute top-0 -right-[100%] duration-200"
              : "absolute top-0 right-0 duration-200"
          }
        >
          <Mobilemenu
            setMobileMenuOpened={setMobileMenuOpened}
            mobileMenuOpened={mobileMenuOpened}
          />
        </div>
        <div className="lg:visible  lg:flex hidden text-white w-[400px] justify-evenly">
          <Link
            href="/"
            className="cursor-pointer hover:text-yellow-500 duration-200"
          >
            Home Page
          </Link>
          <Link
            href="/"
            className="cursor-pointer hover:text-yellow-500 duration-200"
          >
            About Us
          </Link>
          <Link
            href="/"
            className="cursor-pointer hover:text-yellow-500 duration-200"
          >
            FAQ
          </Link>
          <Link
            href="/"
            className="cursor-pointer hover:text-yellow-500 duration-200"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
