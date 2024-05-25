// useManagerData.ts
import { useEffect, useState } from "react";
import { apiRequest, API_PROFILES, API_VENUES } from "../../shared/apis";
import Cookies from "js-cookie";

export const useManagerData = () => {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const userCookie = Cookies.get("user") ?? "";
      const user = JSON.parse(decodeURIComponent(userCookie));
      const userName = user.name;
      const endpoint = `${API_PROFILES}/${userName}`;
      const data = await apiRequest(endpoint);
      setProfile(data.data);
    };

    const fetchBookings = async () => {
      const userCookie = Cookies.get("user");
      const user = JSON.parse(decodeURIComponent(userCookie));
      const userName = user.name;
      const endpoint = `${API_PROFILES}/${userName}/bookings?_venue=true`;
      const data = await apiRequest(endpoint);
      setBookings(data.data);
    };

    const fetchVenues = async () => {
      const userCookie = Cookies.get("user");
      const user = JSON.parse(decodeURIComponent(userCookie));
      const userName = user.name;
      const endpoint = `${API_PROFILES}/${userName}/venues`;
      const data = await apiRequest(endpoint);
      setVenues(data.data);
    };

    fetchProfile();
    fetchBookings();
    fetchVenues();
  }, []);

  return { profile, bookings, venues };
};