"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [btnDisabled, setBtnDisabled] = React.useState(false);

  const onSignUp = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("error singup", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>Sign Up</h1>
      <hr />
      <label>Username</label>
      <input
        id="username"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black  "
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />
      <label>Email</label>
      <input
        id="email"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black "
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <label>Password</label>
      <input
        id="password"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black "
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button
        className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSignUp}
      >
        {btnDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href={"/login"}>Login</Link>
    </div>
  );
}
