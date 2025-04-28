"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import refreshToken from "@/api/refreshToken";

export default function PartnerPanel() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) redirect("/login");
    const decoded = jwtDecode(token);
    let expDate;
    if(decoded.exp) expDate = new Date(decoded.exp)
    const valid = new Date() <= expDate
    // if(!valid) {
        refreshToken()
    // }

    console.log(decoded, expDate, valid)
  });
  return <div>panel zarzadzania partnera</div>;
}
