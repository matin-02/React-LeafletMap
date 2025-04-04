import React from "react";
import { getDistance } from "geolib";
import '../styles/distance.css'

const DistanceCalculator = ({ markers }) => {
  if (markers.length < 2) return null;

  const distance = getDistance(
    { latitude: markers[0].lat, longitude: markers[0].lng },
    { latitude: markers[1].lat, longitude: markers[1].lng }
  );

  return <div>Distance: {distance / 1000} km</div>;
};

export default DistanceCalculator;
