/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Button } from "@/components/ui/button";

const containerStyle = {
  width: "100%",
  height: "500px",
};

export type Place = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

function MapComponent({ lat, lon, nameAddress, title }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBBUCcWAuyK1rHDSfUvRUPaQZoSusBNqlw",
  });
  const [places, setPlaces] = useState<Place[]>([
    {
      name: "Royal Holiday Hanoi Hotel",
      address: "19 Ng. Hàng Hành, Hàng Trống, Hoàn Kiếm, Hà Nội, Vietnam",
      latitude: 21.031503,
      longitude: 105.850441,
    },
  ]);
  const [map, setMap] = React.useState(null);
  const [position, setPosition] = useState({
    lat: 21.031503,
    lng: 105.850441,
  });
  const [selectedPlace, setSelectedPlace] = useState<Place | undefined>(
    undefined
  );
  const onLoad = React.useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(position);
      map.fitBounds(bounds);
      setMap(map);
    },
    [position]
  );

  const onUnmount = React.useCallback(
    function callback(map) {
      setMap(null);
    },
    [map]
  );

  return (
    <div className="w-full">
      <Button
        className="bg-red-400 text-white font-medium w-[100%] px-0 py-2"
        onClick={() => {
          setPosition({ lat: lat, lng: lon });
          setPlaces([
            ...places,
            {
              name: title,
              address: nameAddress,
              latitude: lat,
              longitude: lon,
            },
          ]);
        }}
      >
        Nhấn để xem vị trí bất động sản
      </Button>

      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: position.lat, lng: position.lng }}
          zoom={18}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {places.map((place) => (
            <MarkerF
              key={`${place.address}-${place.name}-${place.latitude}-${place.longitude}`}
              onClick={() => {
                place === selectedPlace
                  ? setSelectedPlace(undefined)
                  : setSelectedPlace(place);
              }}
              position={{ lat: place.latitude, lng: place.longitude }}
            />
          ))}
          {selectedPlace && (
            <InfoWindowF
              position={{
                lat: selectedPlace.latitude,
                lng: selectedPlace.longitude,
              }}
              zIndex={1}
              options={{
                pixelOffset: {
                  width: 0,
                  height: -40,
                },
              }}
              onCloseClick={() => setSelectedPlace(undefined)}
            >
              <div>
                <h3 className="font-semibold rounded-sm">
                  {selectedPlace.name}
                </h3>
                <h6>{selectedPlace.address}</h6>
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default React.memo(MapComponent);
