"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");
  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout failed");
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/token");
    console.log("res", res.data);
    setData(res.data?.data._id);
  };
  return (
    <div className="flex flex-col items-center">
      ProfilePage
      <h2>{data ? <Link href={`/profile/${data}`}>{data}</Link> : ""} </h2>
      <hr />
      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
      <button className="bg-purple-500" onClick={getUserDetails}>
        Hit me
      </button>
    </div>
  );
}

export default ProfilePage;
