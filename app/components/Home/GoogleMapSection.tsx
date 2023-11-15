import React, { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

type Props = {};

const GoogleMapSection = (props: Props) => {
  const containerStyle = {
    width: "100%",
    height: "70vh",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script2",
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
  // });

  const [map, setMap] = useState<any>();

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={(map: google.maps.Map) => {
        setMap(map);
      }}
      onUnmount={onUnmount}
      options={{
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  );
};

export default GoogleMapSection;
