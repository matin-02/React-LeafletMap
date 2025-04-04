import { useMapEvents, Marker } from "react-leaflet";
import L from "leaflet";
import "../styles/marker.css";

// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const LocationMarker = ({ markers, setMarkers }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      if (markers.length < 2) {
       
        setMarkers([...markers, { lat, lng }]);
      } else {
        
        const distances = markers.map(
          (m) => Math.sqrt((lat - m.lat) ** 2 + (lng - m.lng) ** 2)
        );
        const closestIndex = distances[0] < distances[1] ? 0 : 1;
        const updatedMarkers = [...markers];
        updatedMarkers[closestIndex] = { lat, lng };
        setMarkers(updatedMarkers);
      }
    },
  });

  const handleDragEnd = (e, idx) => {
    const { lat, lng } = e.target.getLatLng();
    const updatedMarkers = [...markers];
    updatedMarkers[idx] = { lat, lng };
    setMarkers(updatedMarkers);
  };

  return (
    <>
      {markers.map((marker, idx) => (
        <Marker
          key={idx}
          position={[marker.lat, marker.lng]}
          icon={customIcon}
          draggable={true}
          eventHandlers={{
            dragend: (e) => handleDragEnd(e, idx),
          }}
        />
      ))}
    </>
  );
};

export default LocationMarker;
