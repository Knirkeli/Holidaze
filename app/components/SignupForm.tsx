"use client";
import React, { useState, useEffect } from "react";
import { Button, buttonVariants } from "../../components/ui/button";
import { API_REGISTER } from "../../shared/apis";

async function registerUser(payload: any) {
  const response = await fetch(API_REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    console.error("Response status:", response.status);
    console.error("Response text:", await response.text());
    throw new Error("Registration failed");
  }

  const data = await response.json();
  return data;
}

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [venueManager, setVenueManager] = useState(false);
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
      // Validate name
      if (!/^[a-zA-Z0-9_]+$/.test(name)) {
        console.error("Invalid name. Name can only use a-Z, 0-9, and _");
        return;
      }

      // Validate avatar URL
      try {
        new URL(avatarUrl);
      } catch (_) {
        console.error("Invalid avatar URL. Avatar URL must be a valid URL");
        return;
      }

      const payload = {
        name,
        email,
        password,
        bio,
        avatar: {
          url: avatarUrl,
          alt: `${name} avatar`,
        },
        venueManager,
      };

      try {
        const data = await registerUser(payload);
        // Display a success message and reload the page
        window.alert("User created successfully!");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-md"
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded mt-2"
      />
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
      <input
        type="text"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="w-full px-3 py-2 border rounded mt-2"
      />
      <input
        type="text"
        placeholder="Avatar URL"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
        className="w-full px-3 py-2 border rounded mt-2"
      />
      <label className="flex items-center mt-2">
        <input
          type="checkbox"
          checked={venueManager}
          onChange={(e) => setVenueManager(e.target.checked)}
          className="mr-2"
        />
        I have property to rent out
      </label>
      <Button
        type="submit"
        className="mt-4 bg-blue-500 text-white rounded px-3 py-2"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;
