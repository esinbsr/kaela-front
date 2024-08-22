import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ address }) => {
  const mapRef = useRef(null); // Utilisation d'un ref pour stocker l'instance de la carte
  const coordinatesRef = useRef([51.505, -0.09]); // Coordonnées par défaut

  useEffect(() => {
    if (address) {
      const fetchCoordinates = async () => {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
        );
        const data = await response.json();
        if (data.length > 0) {
          coordinatesRef.current = [data[0].lat, data[0].lon];
          if (mapRef.current) {
            mapRef.current.setView(coordinatesRef.current, 13);
            L.marker(coordinatesRef.current).addTo(mapRef.current);
          }
        }
      };
      fetchCoordinates();
    }
  }, [address]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView(coordinatesRef.current, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }
  }, []);

  return <div id="map"></div>;
};

export default Map;
