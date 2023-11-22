"use client";

import { Button } from "@/components/ui/button";
import {
  destinationState,
  setDirectionRoutePointsState,
  sourceState,
} from "@/lib/states";
import { isEmptyObj, nowInKorea } from "@/lib/utils";
import { useState } from "react";
import { useRecoilState } from "recoil";
import CarListOptions from "./CarListOptions";
import InputItem from "./InputItem";

const SearchSection = () => {
  const [source, setSource] = useRecoilState(sourceState);
  const [destination, setDestination] = useRecoilState(destinationState);
  const [directionRoutePoints, setDirectionRoutePoints] = useRecoilState(
    setDirectionRoutePointsState
  );

  const [distance, setDistance] = useState<any>();

  const directionRoute = async () => {
    // Google Maps API는 외부 서버를 호출해야 하므로 경로 서비스 액세스는 비동기식입니다.
    //따라서 요청 완료 시 실행할 콜백 메서드를 전달해야 합니다. 이 콜백 메서드에서 결과를 처리해야 합니다.
    //경로 서비스에서 두 개 이상의 가능한 여정을 개별 routes[]의 배열로서 반환할 수도 있습니다.
    // Maps JavaScript API에서 경로를 사용하려면 DirectionsService 유형의 객체를 만들고
    // DirectionsService.route()를 호출하여 경로 서비스에 대한 요청을 시작하고
    // 응답 수신 시 실행할 입력 용어와 콜백 메서드가 포함된 DirectionsRequest 객체 리터럴에 이를 전달하세요.

    const nowInKR = await nowInKorea({
      lat: Number(source.lat),
      lng: Number(source.lng),
    });

    const DirectionService = new google.maps.DirectionsService();

    // console.log("source:", source);
    // console.log("destination:", destination);
    const request = {
      origin: { lat: source.lat, lng: source.lng } as google.maps.Place,
      destination: {
        lat: destination.lat,
        lng: destination.lng,
      } as google.maps.Place,
      travelMode: nowInKR
        ? google.maps.TravelMode.TRANSIT
        : google.maps.TravelMode.DRIVING,
    };

    DirectionService.route(request, function (response: any, status: any) {
      console.log("response:", response);
      if (status === google.maps.DirectionsStatus.OK) {
        setDirectionRoutePoints(response);
        // directionsRenderer.setDirections(response);
      } else {
        console.error("Error: ", status);
      }
    });
  };

  const calculateDistance = () => {
    const dist = google.maps.geometry.spherical.computeDistanceBetween(
      {
        lat: Number(source.lat.toFixed(2)),
        lng: Number(source.lng.toFixed(2)),
      },
      {
        lat: Number(destination.lat.toFixed(2)),
        lng: Number(destination.lng.toFixed(2)),
      }
    );

    // console.log(dist * 0.000621374);
    setDistance(dist * 0.000621374);
  };
  return (
    <div className="p-2 md:pd-6 border-[2px] rounded-xl w-[40%]">
      <div>
        <p className="text-[20px] font-bold">뛰뛰 경로</p>
        <InputItem type="source" placeholder="Start 위치" />
        <InputItem type="destination" placeholder="End 위치" />
        <Button
          className="p-3 bg-black w-full mt-5 text-white rounded-lg"
          onClick={() => {
            if (!isEmptyObj(destination) && !isEmptyObj(source)) {
              // console.log("!isEmptyObj(destination) && !isEmptyObj(source)");
              directionRoute();
              calculateDistance();
            }
          }}
        >
          경로 검색
        </Button>
      </div>
      {distance && <CarListOptions distance={distance} />}
    </div>
  );
};

export default SearchSection;
