import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useRecoilState } from "recoil";
import { destinationState, sourceState } from "@/lib/states";

type Props = {};

function isEmptyObj(obj: any) {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true;
  }

  return false;
}

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const GoogleMapSection = (props: Props) => {
  const [source, setSource] = useRecoilState(sourceState);
  const [destination, setDestination] = useRecoilState(destinationState);
  const [center, setCenter]: any = useState<any>({
    lat: 49.28488100000001,
    lng: -123.122643,
  });

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log(pos);
      setCenter({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script2",
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
  // });

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
  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  // useEffect(() => {
  //   getUserLocation();
  // });

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={(map: google.maps.Map) => {
        setMap(map);
      }}
      onUnmount={onUnmount}
      options={{
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
      }}
    >
      {!isEmptyObj(source) ? (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: "/Start.svg",
            scaledSize: {
              width: 50,
              height: 50,
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
            <div className="p-2 bg-white bg-opacity-60 inline-block border-[1px solid #7b376f] rounded-2xl">
              <p className="text-[#7b376f] font-bold text-[16px]">
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
            url: "/Arrive.svg",
            scaledSize: {
              width: 50,
              height: 50,
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
              <p className="text-[#427231] font-bold text-[16px]">
                {destination.label}
              </p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : (
        <></>
      )}
    </GoogleMap>
  );
};

export default GoogleMapSection;
