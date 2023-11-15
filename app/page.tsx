"use client";
import Image from "next/image";
import SearchSection from "./components/Home/SearchSection";
import GoogleMapSection from "./components/Home/GoogleMapSection";
import { SourceConext } from "@/context/SourceContext";
import { useState } from "react";
import { RecoilRoot, atom } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        <SearchSection />
        <GoogleMapSection />
      </div>
    </RecoilRoot>
  );
}
