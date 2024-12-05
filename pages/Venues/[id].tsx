import React, { FC } from "react";
import { useRouter } from "next/router";
import Navbar from "../../app/components/Navbar";
import Footer from "../../app/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import "../../app/globals.css";
import WeatherIcon from "@/components/ui/weather";
import { useVenueData } from "../../app/useFetch/useFetchId";
import BookingCalendar from "../../app/components/BookingCalendar";
import VenueDetails from "../../app/components/VenueDetails";

const Venue: FC = () => {
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id || "";
  const { venueData, disabledDates, isLoading } = useVenueData(id);

  if (!venueData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-16">
        <h1 className="text-4xl font-bold mb-4">{venueData.name}</h1>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 pr-4">
            <Carousel className="w-full pb-6">
              <CarouselContent>
                {venueData?.media.map((media, index) => (
                  <CarouselItem key={index} className="h-full">
                    <div className="aspect-w-2 aspect-h-1">
                      <img
                        src={media.url}
                        alt={media.alt}
                        className="w-full h-full object-cover shadow-2xl"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious>Previous</CarouselPrevious>
              <CarouselNext>Next</CarouselNext>
            </Carousel>
          </div>
          <div className="w-full md:w-1/3 pl-4 flex flex-col items-center">
            {!isLoading && (
              <BookingCalendar
                unavailableDates={disabledDates}
                venueData={venueData}
                id={id}
              />
            )}
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <VenueDetails venueData={venueData} />
          </div>
        </div>
      </div>
      <div className="text-2xl font-semibold mb-2">
        <WeatherIcon />
      </div>
      <Footer />
    </>
  );
};

export default Venue;
