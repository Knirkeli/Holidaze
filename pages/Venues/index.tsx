"use client";
import React from "react";
import { API_VENUES } from "@/shared/apis";
import { useFetch } from "@/app/useFetch/useFetchVenues";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import "../../app/globals.css";
import Link from "next/link";
import Navbar from "../../app/components/Navbar";
import Footer from "../../app/components/Footer";

interface Media {
  url: string;
  alt: string;
}

interface Venue {
  id: string;
  name: string;
  price: number;
  media: Media[];
}

interface FetchData {
  data: Venue[];
}

const VenueCard: React.FC<{ venue: Venue }> = ({ venue }) => (
  <Link href={`/Venues/${venue.id}`} key={venue.id}>
    <Card className="flex flex-col border border-gray-300 rounded p-4 mb-4 max-w-md m-auto h-auto transform transition duration-500 ease-in-out hover:shadow-lg hover:scale-105">
      <CardTitle className="text-lg text-center font-semibold mb-2">
        {venue.name}
      </CardTitle>
      {venue.media && venue.media.length > 0 && (
        <div className="w-4/5 h-48 self-center overflow-hidden m-auto">
          <img
            className="w-full h-full object-cover"
            src={venue.media[0].url}
            alt={venue.media[0].alt}
          />
        </div>
      )}
      <CardDescription className="text-base text-center mb-2 mt-auto">
        Price: {venue.price ? venue.price : "N/A"} NOK/Night
      </CardDescription>
    </Card>
  </Link>
);

export default function Venues() {
  const { data, isLoading, isError } = useFetch(API_VENUES);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <>
      <Navbar />
      <h1 className="text-center text-4xl py-4">Venues</h1>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data &&
            data.data.map((venue) => (
              <VenueCard venue={venue} key={venue.id} />
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
