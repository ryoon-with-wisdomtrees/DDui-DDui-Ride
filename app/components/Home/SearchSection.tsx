import React from "react";
import InputItem from "./InputItem";
import { Button } from "@/components/ui/button";

type Props = {};

const SearchSection = (props: Props) => {
  return (
    <div className="p-2 md:pd-6 border-[2px] rounded-xl">
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
