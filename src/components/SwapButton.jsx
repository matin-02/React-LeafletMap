import React from "react";
import "../styles/swapbutton.css";

const SwapButton = ({ markers, setMarkers }) => {
  
  if (markers.length < 2) return null;

  const swapMarkers = () => {
    if (markers.length >= 2) {
      let newMarkers = [...markers];
      
      [newMarkers[0], newMarkers[1]] = [newMarkers[1], newMarkers[0]];
      setMarkers(newMarkers);
    }
  };

  return (
    <button 
      className="swap-button" 
      onClick={swapMarkers} 
      disabled={markers.length < 2}
    >
      Swap Locations
    </button>
  );
};

export default SwapButton;
