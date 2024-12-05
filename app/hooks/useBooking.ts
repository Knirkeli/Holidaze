import { Key, ReactNode, useState } from 'react';
import { getAccessToken, getApiKey } from "../../shared/cookies";
import { API_BOOKINGS } from "../../shared/apis";

export interface VenueData {
  id: Key | null | undefined;
  media: any;
  name: ReactNode;
  location: any;
  meta: any;
  rating: ReactNode;
  price: ReactNode;
  description: ReactNode;
  maxGuests: any;
  bookings: {
    dateFrom: string;
    dateTo: string;
  }[];
}

 interface BookingCalendarProps {
  unavailableDates: Date[];
  venueData: VenueData | null;
  id: string | string[] | undefined;
}

export function useBooking(venueData: { maxGuests: any; }, id: string | string[] | undefined) {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>(undefined);

  const handleBooking = async () => {
    if (!venueData || !dateRange) {
      alert("Please select a date range first.");
      return;
    }
  
    const token = getAccessToken();
    const apiKey = getApiKey();
  
    if (!apiKey) {
      throw new Error("API key is missing");
    }
  
    const response = await fetch(API_BOOKINGS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify({
        dateFrom: dateRange.from.toISOString(),
        dateTo: dateRange.to.toISOString(),
        guests: venueData.maxGuests,
        venueId: id,
      }),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    window.alert("Booking successful!");
  };

  return { dateRange, setDateRange, handleBooking };
}