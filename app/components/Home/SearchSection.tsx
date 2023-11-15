"use client";

import React, { useEffect } from "react";
import InputItem from "./InputItem";
import { Button } from "@/components/ui/button";
import { useRecoilState } from "recoil";
import { destinationState, sourceState } from "@/lib/states";

type Props = {};

const SearchSection = (props: Props) => {
  const [source, setSource] = useRecoilState(sourceState);
  const [destination, setDestination] = useRecoilState(destinationState);

  useEffect(() => {
    // if (source) {
    console.log("source::", source);
    // } else if (destination) {
    console.log("destination::", destination);
    // }
  }, [source, destination]);
  return (
    <div className="p-2 md:pd-6 border-[2px] rounded-xl w-[40%]">
      <p className="text-[20px] font-bold">Get a ride</p>
      <InputItem type="source" placeholder="Pickup Location" />
      <InputItem type="destination" placeholder="Dropoff Location" />
      <Button className="p-3 bg-black w-full mt-5 text-white rounded-lg">
        Search
      </Button>
    </div>
  );
};

export default SearchSection;
