import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import LocationMarker from "./LocationMarker";
import SearchBox from "./SearchBox";
import DistanceCalculator from "./DistanceCalculator";
import SwapButton from "./SwapButton";

const customIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [32, 48],
  iconAnchor: [16, 48],
});

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarkers, setSelectedMarkers] = useState([]);

  const handleMarkerClick = (index) => {
    let newSelection = [...selectedMarkers];
    if (newSelection.includes(index)) {
      newSelection = newSelection.filter((i) => i !== index);
    } else if (newSelection.length < 2) {
      newSelection.push(index);
    }
    setSelectedMarkers(newSelection);
  };

  return (
    <div className="map-container">
      <SearchBox markers={markers} setMarkers={setMarkers} />
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker markers={markers} setMarkers={setMarkers} />
        {markers.map((position, index) => (
          <Marker
            key={index}
            position={[position.lat, position.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => handleMarkerClick(index),
            }}
          />
        ))}
      </MapContainer>
      <DistanceCalculator markers={markers} />
      <SwapButton markers={markers} setMarkers={setMarkers} selectedMarkers={selectedMarkers} setSelectedMarkers={setSelectedMarkers} />
    </div>
  );
};

export default MapComponent;
