import React from "react";
import { Map, Marker } from "pigeon-maps";
import { useMediaQuery } from "react-responsive";

export function PropertyMap({ height, lat, long, zoom = 8 }) {
  const isMobile = useMediaQuery({
    query: "(max-width:600px)",
  });
  return (
    <Map
      height={isMobile ? 200 : height}
      style={{ borderRadius: "1rem" }}
      defaultCenter={[lat, long]}
      defaultZoom={zoom}
      width={isMobile ? 350 : 700}
    >
      <Marker width={50} color="red" anchor={[lat, long]} />
    </Map>
  );
}
