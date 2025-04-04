import React from "react";
import MapComponent from "../components/MapComponent";
import "../styles/home.css"

const Home = () => {
  return (
    <div>
      <h1 className="title">React Leaflet Map </h1>
      <MapComponent />
    </div>
  );
};

export default Home;

