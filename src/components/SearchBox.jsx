import React, { useEffect, useState } from "react";
import "../styles/searchbox.css";

const SearchBox = ({ markers, setMarkers }) => {
  const [searchQuery1, setSearchQuery1] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");

  // Reverse geocoding function to get place name from lat/lng
  const reverseGeocode = async (lat, lng, setQuery) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      if (data && data.display_name) {
        setQuery(data.display_name);
      } else {
        setQuery(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
      }
    } catch (error) {
      setQuery(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    }
  };

  // Update inputs when marker changes
  useEffect(() => {
    if (markers[0]) {
      reverseGeocode(markers[0].lat, markers[0].lng, setSearchQuery1);
    }
    if (markers[1]) {
      reverseGeocode(markers[1].lat, markers[1].lng, setSearchQuery2);
    }
  }, [markers]);

  const handleSearch = async (query, index) => {
    if (!query) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const updatedMarkers = [...markers];
        updatedMarkers[index] = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setMarkers(updatedMarkers.slice(0, 2));

        if (index === 0) setSearchQuery1(display_name);
        else setSearchQuery2(display_name);
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="search-box-container">
      
      <div className="search-box">
        <input
          type="text"
          value={searchQuery1}
          onChange={(e) => setSearchQuery1(e.target.value)}
          placeholder="Search first location..."
        />
        <button onClick={() => handleSearch(searchQuery1, 0)}>Search</button>
      </div>

      
      <div className="search-box">
        <input
          type="text"
          value={searchQuery2}
          onChange={(e) => setSearchQuery2(e.target.value)}
          placeholder="Search second location..."
        />
        <button onClick={() => handleSearch(searchQuery2, 1)}>Search</button>
      </div>
    </div>
  );
};

export default SearchBox;
