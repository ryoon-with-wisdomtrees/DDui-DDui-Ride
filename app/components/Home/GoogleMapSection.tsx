import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useRecoilState } from "recoil";
import { destinationState, sourceState } from "@/lib/states";

type Props = {};

function isEmptyObj(obj: any) {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true;
  }

  return false;
}

const GoogleMapSection = (props: Props) => {
  const [source, setSource] = useRecoilState(sourceState);
  const [destination, setDestination] = useRecoilState(destinationState);
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log(pos);
      setCenter({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };
  // {
  //   lat: -3.745,
  //   lng: -38.523,
  // }
  const [center, setCenter]: any = useState<any>();

  const containerStyle = {
    width: "100%",
    height: "70vh",
  };

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script2",
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
  // });

  const [map, setMap] = useState<any>();

  useEffect(() => {
    if (!isEmptyObj(source) && map) {
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }
  }, [source]);
  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  useEffect(() => {
    getUserLocation();
  });

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
    ></GoogleMap>
  );
};

export default GoogleMapSection;
