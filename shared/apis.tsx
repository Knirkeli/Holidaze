// Importing Cookies from "js-cookie" to handle cookies
import Cookies from "js-cookie";

// Base URL for the API
const API_BASE_URL = "https://v2.api.noroff.dev";

// API endpoints
export const API_VENUES = `${API_BASE_URL}/holidaze/venues`;
export const API_VENUES_BOOKINGS = `${API_BASE_URL}/holidaze/venues?_bookings=true`;
export const API_PROFILES = `${API_BASE_URL}/holidaze/profiles`;
export const API_BOOKINGS = `${API_BASE_URL}/holidaze/bookings`;
export const API_REGISTER = `${API_BASE_URL}/auth/register`;
export const API_LOGIN = `${API_BASE_URL}/auth/login?_holidaze=true`;
export const API_KEY = `${API_BASE_URL}/auth/create-api-key`;

// Function to make API requests
export async function apiRequest(
  endpoint: string,
  method: string = "GET",
  body: { [key: string]: any } | null = null
) {
  // Get access token and API key from cookies
  const accessToken = Cookies.get("accessToken");
  const apiKey = Cookies.get("SalmonKey");

  // Define options for the fetch request
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey || "",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  };

  // Make the fetch request
  const response = await fetch(endpoint, options);

  // If the response is not ok, throw an error
  if (!response.ok) {
    throw new Error(`An error has occurred: ${response.status}`);
  }

  // Parse the response text to JSON
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}
