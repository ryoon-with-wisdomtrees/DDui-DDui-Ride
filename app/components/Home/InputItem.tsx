"use client";
import { Input } from "@/components/ui/input";
import { destinationState, sourceState } from "@/lib/states";
import {
  CheckCircle,
  CircleDashed,
  CircleDot,
  CircleDotDashedIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useRecoilState } from "recoil";

type Props = {
  type: string;
  placeholder: string;
};

const InputItem = ({ type, placeholder }: Props) => {
  const [value, setValue]: any = useState(null);
  const [source, setSource] = useRecoilState(sourceState);
  const [destination, setDestination] = useRecoilState(destinationState);

  const getLatAndLng = (place: any, type: string) => {
    // console.log("place, type :", place, type);
    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId }, (place, status) => {
      if (status === "OK" && place?.geometry && place.geometry.location) {
        console.log("type: ", type);
        if (type === "source") {
          setSource({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        }
        if (type === "destination") {
          setDestination({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        }
      }
    });
  };
  const id = Date.now().toString();
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
          onChange: (place) => {
            getLatAndLng(place, type);
            setValue(place);
          },
          placeholder: placeholder,
          isClearable: true,
          className: "w-full",
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
