import React, { useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const center = { lat: 19.076, lng: 72.8777 };
const LIBRARIES = ["marker"]; // ✅ STATIC

const ConstituencyMap = () => {
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries: LIBRARIES,
  });

  const onLoad = (map) => {
    mapRef.current = map;

    new google.maps.marker.AdvancedMarkerElement({
      map,
      position: center,
      title: "Mumbai Constituency",
    });
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={center}
      zoom={10}
      mapId={import.meta.env.VITE_GOOGLE_MAP_ID} // ✅ REQUIRED
      onLoad={onLoad}
    />
  );
};

export default ConstituencyMap;
