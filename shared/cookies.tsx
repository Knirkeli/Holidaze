// Importing Cookies from "js-cookie" to handle cookies
import Cookies from "js-cookie";

// Function to set the access token in a cookie
export function setAccessToken(token: string) {
  // The cookie is secure and has the sameSite attribute set to "strict"
  Cookies.set("accessToken", token, { secure: true, sameSite: "strict" });
}

// Function to get the access token from a cookie
export function getAccessToken() {
  return Cookies.get("accessToken");
}

// Function to set the user information in a cookie
export function setUser(user: any) {
  // The user information is stringified and stored in the cookie
  // The avatar URL is encoded to ensure it's stored correctly
  // The cookie is secure and has the sameSite attribute set to "strict"
  Cookies.set(
    "user",
    JSON.stringify({
      name: user.name,
      email: user.email,
      avatar: encodeURIComponent(user.avatar.url),
      venueManager: user.venueManager, // Add the venueManager property
    }),
    { secure: true, sameSite: "strict" }
  );
}

// Function to set the API key in a cookie
export function setApiKeyCookie(apiKey: string) {
  // The cookie is secure in production and has the sameSite attribute set to "strict"
  Cookies.set("SalmonKey", apiKey, {
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });
}

// Function to get the API key from a cookie
export function getApiKey() {
  return Cookies.get("SalmonKey");
}
