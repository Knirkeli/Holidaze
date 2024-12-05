import { useState, useEffect } from "react";
import { API_VENUES } from "../../shared/apis";

interface VenueData {
  id: string;
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  rating: number;
  location: {
    address: string;
    city: string;
    country: string;
  };
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  media: {
    url: string;
    alt: string;
  }[];
  bookings: {
    dateFrom: string;
    dateTo: string;
  }[];
}

export function useVenueData(id: string) {
  const [venueData, setVenueData] = useState<VenueData | null>(null);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function getDatesBetweenDates(startDate: Date, endDate: Date) {
    let dates = [];
    const currDate = new Date(startDate);
    const lastDate = new Date(endDate);
  
    while (currDate <= lastDate) {
      dates.push(new Date(currDate));
      currDate.setDate(currDate.getDate() + 1);
    }
  
    return dates;
  }
  
  async function fetchVenueData() {
    setIsLoading(true);
    const response = await fetch(`${API_VENUES}/${id}?_bookings=true`);
    const data = await response.json();
  
    // Check if the media array is not empty
    if (data.data.media.length > 0) {
      // Add the id property to the venueData object
      const venueData: VenueData = {
        id: id, 
        ...data.data,
      };
  
      setVenueData(venueData); // Update the state with the new venueData object
  
      const disabledDates = data.data.bookings
        .map((booking: { dateFrom: string | number | Date; dateTo: string | number | Date; }) =>
          getDatesBetweenDates(
            new Date(booking.dateFrom),
            new Date(booking.dateTo)
          )
        )
        .flat();
  
      setDisabledDates(disabledDates);
    }
  
    setIsLoading(false);
  }
  
  useEffect(() => {
    if (id) {
      fetchVenueData();
    }
  }, [id]);
  
  return { venueData, disabledDates, isLoading };
}