import { useEffect, useState } from 'react';

import styles from './App.module.scss';

import 'leaflet/dist/leaflet.css';
import { Circle, MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet';
import { icon, LatLngLiteral } from 'leaflet';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';

const markerIcon = icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

interface LatLongAndAccuracy extends LatLngLiteral {
  accuracy: number;
}

const polygon: LatLngLiteral[] = [
  {
    lat: 51.9813456,
    lng: -0.24,
  },
  {
    lat: 51.99,
    lng: -0.22,
  },
  {
    lat: 51.97,
    lng: -0.21,
  },
  {
    lat: 51.974,
    lng: -0.24,
  },
];

function Map() {
  const [coords, setCoords] = useState<LatLongAndAccuracy | undefined>(undefined);
  const [geoError, setGeoError] = useState<GeolocationPositionError | undefined>(undefined);

  useEffect(() => {
    const geo = navigator.geolocation;
    const watchHandle = geo.watchPosition(
      (e) => {
        setCoords({
          lat: e.coords.latitude,
          lng: e.coords.longitude,
          accuracy: e.coords.accuracy,
        });
      },
      (err) => {
        setGeoError(err);
      },
      {
        enableHighAccuracy: true,
      }
    );
    return () => {
      geo.clearWatch(watchHandle);
    };
  }, []);

  return (
    <div className={styles.app}>
      <header>{geoError ? `Geospatial API error: ${geoError.message}` : 'Browser Geo Demo'}</header>
      <MapContainer className={styles.map} center={[51.9813456, -0.2189784]} zoom={7} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon positions={polygon}></Polygon>
        <Marker icon={markerIcon} position={[51.9814, -0.218]}>
          <Popup>
            <a href="https://www.forensicanalytics.co.uk/" target="_blank" rel="noreferrer">
              Forensic Analytics
            </a>
          </Popup>
        </Marker>
        {coords ? (
          <>
            <Marker icon={markerIcon} position={coords}>
              <Popup>You!</Popup>
            </Marker>
            <Circle center={coords} radius={coords.accuracy}></Circle>
          </>
        ) : null}
      </MapContainer>
      <footer>Map shows FA location + polygon and user's location with accuracy circle.</footer>
    </div>
  );
}

export default Map;
