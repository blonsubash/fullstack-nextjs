"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const resposne = await axios.post("api/users/login", user);
      console.log("login success", resposne.data);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />

      <label>Email</label>
      <input
        id="email"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black  "
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <label>Password</label>
      <input
        id="password"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black  "
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button
        className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onLogin}
      >
        Login
      </button>
      <Link href={"/signup"}>Sign up</Link>
    </div>
  );
}
