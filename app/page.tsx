"use client";
import Image from "next/image";
import SearchSection from "./components/Home/SearchSection";
import GoogleMapSection from "./components/Home/GoogleMapSection";
import { SourceConext } from "@/context/SourceContext";
import { useState } from "react";
import { RecoilRoot, atom } from "recoil";
import { LoadScript } from "@react-google-maps/api";

export default function Home() {
  return (
    <RecoilRoot>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
        libraries={["places"]} // place 정보에 access가능하게 하기 위함
      >
        <div className="p-6 flex flex-row  gap-5">
          <SearchSection />
          <GoogleMapSection />
        </div>
      </LoadScript>
    </RecoilRoot>
  );
}
