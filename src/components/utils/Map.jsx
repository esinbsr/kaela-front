import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const Map = ({ address }) => {
  const mapRef = useRef(null); // Référence pour la carte Leaflet
  const coordinatesRef = useRef([51.505, -0.09]); // Coordonnées par défaut (Londres)

  // Charger les coordonnées depuis l'adresse
  useEffect(() => {
    const fetchCoordinates = async () => {
      if (address) {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
          );

          const data = response.data; // Axios retourne directement les données JSON
          if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            coordinatesRef.current = [lat, lon];

            // Mettre à jour la carte avec les nouvelles coordonnées
            if (mapRef.current) {
              mapRef.current.setView(coordinatesRef.current, 13);
              L.marker(coordinatesRef.current).addTo(mapRef.current);
            }
          } else {
            console.error('No results found for the given address.');
          }
        } catch (error) {
          console.error('Error fetching coordinates:', error);
        }
      }
    };

    fetchCoordinates();
  }, [address]);

  // Initialisation de la carte
  useEffect(() => {
    if (!mapRef.current) {
      // Création de la carte
      mapRef.current = L.map('map').setView(coordinatesRef.current, 13);

      // Ajout des tuiles OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }
  }, []);

  return (
    <div
      id="map"
    ></div>
  );
};

export default Map;
