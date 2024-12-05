"use client";
import Cookies from "js-cookie";
import React from "react";
import "../../app/globals.css";
import { Button, buttonVariants } from "../../components/ui/button";

const Logout = () => {
  const handleLogout = () => {
    Cookies.remove("SalmonKey");
    Cookies.remove("accessToken");
    Cookies.remove("user");

    // Use window.location to redirect to the home page
    window.location.href = "/";
  };

  return (
    <>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-md text-center">
        <Button
          onClick={handleLogout}
          className="bg-blue-500 text-white rounded px-3 py-2"
        >
          Logout
        </Button>
      </div>
    </>
  );
};

export default Logout;
