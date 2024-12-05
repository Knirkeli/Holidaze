"use client";
import React, { useState, useEffect } from "react";
import { API_LOGIN, API_KEY } from "../../shared/apis";
import { setAccessToken, setApiKeyCookie, setUser } from "../../shared/cookies";
import "../../app/globals.css";
import { Button, buttonVariants } from "../../components/ui/button";

async function loginUser(email: string, password: string, _holidaze: string) {
  const response = await fetch(API_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, _holidaze }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data;
}

async function createApiKey(accessToken: string, name?: string) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name }),
  };

  const response = await fetch(API_KEY, options);
  const data = await response.json();

  if (response.ok) {
    return data.data.key;
  } else {
    throw new Error(data.error);
  }
}

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    const validateEmail = () => {
      const re =
        /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)?(noroff|stud\.noroff)\.no$/;
      return re.test(email);
    };

    setEmailError(!validateEmail());
  }, [email]);

  useEffect(() => {
    setPasswordError(password.length < 8);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailError && !passwordError) {
      try {
        const _holidaze = "yourValueHere"; // replace with your actual _holidaze value
        const response = await loginUser(email, password, _holidaze);
        const data = response.data;

        // Use the returned data to log the user in

        // Set the access token and user cookies
        setAccessToken(data.accessToken);
        setUser(data);

        const apiKey = await createApiKey(data.accessToken);

        // Set the API key cookie
        setApiKeyCookie(apiKey);

        // Reload the page
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-md"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded mt-2"
        />
        {emailError && (
          <p className="text-red-500">Please enter a valid Noroff email.</p>
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded mt-2"
        />
        {passwordError && (
          <p className="text-red-500">
            Password must be at least 8 characters long.
          </p>
        )}
        <Button
          type="submit"
          className="mt-4 bg-blue-500 text-white rounded px-3 py-2"
        >
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
