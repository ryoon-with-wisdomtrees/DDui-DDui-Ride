"use client";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  CircleDashed,
  CircleDot,
  CircleDotDashedIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

type Props = {
  type: string;
  placeholder: string;
};

const InputItem = ({ type, placeholder }: Props) => {
  const [value, setValue]: any = useState(null);
  const [templaceholder, setTempplaceholder]: any = useState(null);
  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      {type === "source" ? <CircleDotDashedIcon /> : <CircleDot />}
      {/* <Input
        type="text"
        placeholder={placeholder}
        className="bg-transparent w-full outline-none"
      /> */}
      {/**어떤 apicall 없이도 장소검색이 가능한 라이브러리 */}
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} //for client side
        selectProps={{
          value,
          onChange: setValue,
          placeholder: placeholder,
          isClearable: true,
          className: " w-full",
          components: {
            DropdownIndicator: null,
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
              border: "none",
            }),
            // option: (provided) => ({
            //   ...provided,
            //   color: "blue",
            // }),
            // singleValue: (provided) => ({
            //   ...provided,
            //   color: "blue",
            // }),
          },
        }}
      />
    </div>
  );
};

export default InputItem;
