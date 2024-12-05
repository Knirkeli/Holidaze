import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import React from "react";
import "../../app/globals.css";

const ContactPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Contact SalmonBeds</h1>
          <p className="mb-2">Phone: 123-456-7890</p>
          <p>Email: info@salmonbeds.com</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
