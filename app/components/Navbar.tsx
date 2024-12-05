"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { PopoverTrigger } from "@/components/ui/popover";
import { PersonIcon } from "@radix-ui/react-icons";
import Cookies from "js-cookie";

const Popover = React.lazy(() =>
  import("@/components/ui/popover").then((module) => ({
    default: module.Popover,
  }))
);
const PopoverContent = React.lazy(() =>
  import("@/components/ui/popover").then((module) => ({
    default: module.PopoverContent,
  }))
);
const LoginForm = React.lazy(() => import("./Login"));
const Logout = React.lazy(() => import("./LogOut"));
const SignupForm = React.lazy(() => import("./SignupForm"));

const links = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const accessToken = Cookies.get("accessToken");
  return (
    <header className="border-b">
      <div className="flex items center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
          <div className="flex items-center">
            <Image src="/sblogo.png" alt="Logo" width={100} height={50} />
            <h1 className="text-2xl md:text-4xl font-bold ml-4">
              Salmon <span className="text-primary">Beds</span>
            </h1>
          </div>
        </Link>
        <nav className="flex gap-12 lg:flex 2xl:ml-16 mt-auto">
          {links.map((link, idx) => (
            <div
              key={idx}
              className={
                idx === 0 || idx === links.length - 1 ? "lg:flex" : "flex"
              }
            >
              {pathname === link.href ? (
                <Link
                  className="text-lg font-semibold text-primary"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-grey-600 transition duration-100 hover:text-blue-500"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Popover>
            <PopoverTrigger>
              <PersonIcon className="hover:text-blue-500 cursor-pointer text-4xl mb-2 mt-auto" />
            </PopoverTrigger>
            <PopoverContent className="bg-white shadow-lg rounded-lg w-auto">
              {accessToken ? (
                <>
                  <Link
                    href="/Manager"
                    className="hover:text-blue-500 cursor-pointer text-lg mr-4"
                  >
                    Profile
                  </Link>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Popover>
                      <PopoverTrigger>
                        <div className="hover:text-blue-500 cursor-pointer text-lg">
                          Log out
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="bg-white shadow-lg rounded-lg p-4">
                        <Logout />
                      </PopoverContent>
                    </Popover>
                  </Suspense>
                </>
              ) : (
                <>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Popover>
                      <PopoverTrigger>
                        <div className="hover:text-blue-500 cursor-pointer text-lg">
                          Log in
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="bg-white shadow-lg rounded-lg p-4">
                        <LoginForm />
                      </PopoverContent>
                    </Popover>
                  </Suspense>

                  <Suspense fallback={<div>Loading...</div>}>
                    <Popover>
                      <PopoverTrigger>
                        <div className="hover:text-blue-500 cursor-pointer text-lg">
                          Sign up
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="bg-white shadow-lg rounded-lg">
                        <SignupForm />
                      </PopoverContent>
                    </Popover>
                  </Suspense>
                </>
              )}
            </PopoverContent>
          </Popover>
        </Suspense>
      </div>
    </header>
  );
}
