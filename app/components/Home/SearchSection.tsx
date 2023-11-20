"use client";

import React, { useEffect } from "react";
import InputItem from "./InputItem";
import { Button } from "@/components/ui/button";
import { useRecoilState } from "recoil";
import {
  destinationState,
  setDirectionRoutePointsState,
  sourceState,
} from "@/lib/states";
import { isEmptyObj } from "@/lib/utils";

type Props = {};

const SearchSection = (props: Props) => {
  const [source, setSource] = useRecoilState(sourceState);
  const [destination, setDestination] = useRecoilState(destinationState);
  const [directionRoutePoints, setDirectionRoutePoints] = useRecoilState(
    setDirectionRoutePointsState
  );
  // useEffect(() => {
  //   // if (source) {
  //   console.log("source::", source);
  //   // } else if (destination) {
  //   console.log("destination::", destination);
  //   // }
  // }, [source, destination]);

  const directionRoute = () => {
    // Google Maps API는 외부 서버를 호출해야 하므로 경로 서비스 액세스는 비동기식입니다.
    //따라서 요청 완료 시 실행할 콜백 메서드를 전달해야 합니다. 이 콜백 메서드에서 결과를 처리해야 합니다.
    //경로 서비스에서 두 개 이상의 가능한 여정을 개별 routes[]의 배열로서 반환할 수도 있습니다.
    // Maps JavaScript API에서 경로를 사용하려면 DirectionsService 유형의 객체를 만들고
    // DirectionsService.route()를 호출하여 경로 서비스에 대한 요청을 시작하고
    // 응답 수신 시 실행할 입력 용어와 콜백 메서드가 포함된 DirectionsRequest 객체 리터럴에 이를 전달하세요.
    const DirectionService = new google.maps.DirectionsService();

    console.log("source:", source);
    console.log("destination:", destination);
    const request = {
      origin: { lat: source.lat, lng: source.lng } as google.maps.Place,
      destination: {
        lat: destination.lat,
        lng: destination.lng,
      } as google.maps.Place,
      travelMode: google.maps.TravelMode.TRANSIT,
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

  useEffect(() => {
    //도착지 출발지 무엇을 먼저 설정할지 모르니까 양쪽에.
    if (!isEmptyObj(destination) && !isEmptyObj(source)) {
      console.log("!isEmptyObj(destination) && !isEmptyObj(source)");
      directionRoute();
      // directionsRenderer.setMap(map);
      // directionsRenderer.setPanel(document.getElementById("directionsPanel"));
    }
  }, [source]);

  useEffect(() => {
    if (!isEmptyObj(destination) && !isEmptyObj(source)) {
      console.log("!isEmptyObj(destination) && !isEmptyObj(source)");
      directionRoute();
      // directionsRenderer.setMap(map);
      // directionsRenderer.setPanel(document.getElementById("directionsPanel"));
    }
  }, [destination]);

  return (
    <div className="p-2 md:pd-6 border-[2px] rounded-xl w-[40%]">
      <p className="text-[20px] font-bold">뛰뛰 경로</p>
      <InputItem type="source" placeholder="Pickup 위치" />
      <InputItem type="destination" placeholder="Dropoff 위치" />
      <Button className="p-3 bg-black w-full mt-5 text-white rounded-lg">
        Search
      </Button>
    </div>
  );
};

export default SearchSection;
