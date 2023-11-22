import {
  centerStates,
  destinationState,
  setDirectionRoutePointsState,
  sourceState,
} from "@/lib/states";
import { isEmptyObj } from "@/lib/utils";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
} from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

type Props = {};

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const GoogleMapSection = (props: Props) => {
  // const directionsRenderer = new google.maps.DirectionsRenderer();
  const [source, setSource] = useRecoilState(sourceState);
  const [destination, setDestination] = useRecoilState(destinationState);
  const [directionRoutePoints, setDirectionRoutePoints] = useRecoilState(
    setDirectionRoutePointsState
  );
  const [center, setCenter]: any = useRecoilState(centerStates);

  const [map, setMap] = useState<any>();

  useEffect(() => {
    if (!isEmptyObj(source) && map) {
      console.log("source::::::::::::", source);
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }
  }, [source]);

  useEffect(() => {
    if (!isEmptyObj(destination) && map) {
      console.log("destination::::::::::::", destination);
      // map.panTo({
      //   lat: destination.lat,
      //   lng: destination.lng,
      // });
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }
  }, [destination]);

  //   // Google Maps API는 외부 서버를 호출해야 하므로 경로 서비스 액세스는 비동기식입니다.
  //   //따라서 요청 완료 시 실행할 콜백 메서드를 전달해야 합니다. 이 콜백 메서드에서 결과를 처리해야 합니다.
  //   //경로 서비스에서 두 개 이상의 가능한 여정을 개별 routes[]의 배열로서 반환할 수도 있습니다.
  //   // Maps JavaScript API에서 경로를 사용하려면 DirectionsService 유형의 객체를 만들고
  //   // DirectionsService.route()를 호출하여 경로 서비스에 대한 요청을 시작하고
  //   // 응답 수신 시 실행할 입력 용어와 콜백 메서드가 포함된 DirectionsRequest 객체 리터럴에 이를 전달하세요.
  //   const DirectionService = new google.maps.DirectionsService();

  //   console.log("source:", source);
  //   console.log("destination:", destination);
  //   const request = {
  //     origin: { lat: source.lat, lng: source.lng } as google.maps.Place,
  //     destination: {
  //       lat: destination.lat,
  //       lng: destination.lng,
  //     } as google.maps.Place,
  //     travelMode: google.maps.TravelMode.TRANSIT,
  //   };

  //   DirectionService.route(request, function (response: any, status: any) {
  //     console.log("response:", response);
  //     if (status === google.maps.DirectionsStatus.OK) {
  //       setDirectionRoutePoints(response);
  //       // directionsRenderer.setDirections(response);
  //     } else {
  //       console.error("Error: ", status);
  //     }
  //   });
  // };
  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    setMap(map);

    const dodm = new google.maps.places.PlacesService(map);
    console.log("dodm", dodm);
    // directionsRenderer.setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
      }}
    >
      {!isEmptyObj(source) ? (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: "/Start.png",
            scaledSize: {
              width: 70,
              height: 70,
              equals(other) {
                return true;
              },
            },
          }}
        >
          <OverlayViewF
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white bg-opacity-60 inline-block border-[1px solid #b5a921] rounded-2xl">
              <p className="text-[#393938] font-bold text-[16px]">
                {source.label}
              </p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : (
        <></>
      )}
      {!isEmptyObj(destination) ? (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: "/End.png",
            scaledSize: {
              width: 70,
              height: 70,
              equals(other) {
                return true;
              },
            },
          }}
        >
          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white bg-opacity-60 inline-block border-[1px solid #427231] rounded-2xl">
              <p className="text-[#393938] font-bold text-[16px]">
                {destination.label}
              </p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : (
        <></>
      )}
      {!isEmptyObj(source) && !isEmptyObj(destination) && (
        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            polylineOptions: {
              strokeColor: "#393938",
              strokeWeight: 10,
            },
            suppressMarkers: true,
          }}
        />
      )}
      {/* <div id="directionsPanel"></div> */}
    </GoogleMap>
  );
};

export default GoogleMapSection;
