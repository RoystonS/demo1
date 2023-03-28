import { useEffect, useState, MutableRefObject, useRef } from 'react';

import 'leaflet/dist/leaflet.css';
import { Circle, MapContainer, Marker, Polygon, Popup, TileLayer, useMap } from 'react-leaflet';
import { icon, LatLngLiteral, Map as LeafletMap } from 'leaflet';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';

import {
  makeStyles,
  Button,
  Title1,
  tokens,
  shorthands,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from '@fluentui/react-components';

import {
  bundleIcon,
  iconFilledClassName,
  iconRegularClassName,
  Location24Filled,
  Location24Regular,
} from '@fluentui/react-icons';
import { AllThemes, useTheming } from './theming';

const useIconStyles = makeStyles({
  icon: {
    ':hover': {
      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
    },
  },
});

const LocationIcon = bundleIcon(Location24Filled, Location24Regular);

const brandColors = {
  backgroundColor: tokens.colorBrandBackground,
  color: tokens.colorNeutralStrokeOnBrand,
};

const useStyles = makeStyles({
  app: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    ...shorthands.flex('none'),
    ...shorthands.padding(tokens.spacingHorizontalXS),
    ...brandColors,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  map: {
    ...shorthands.flex('auto'),
  },
  footer: {
    ...shorthands.flex('none'),
    ...shorthands.padding(tokens.spacingHorizontalXS),
    ...brandColors,
  },
});

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

interface MapContentProps {
  mapRef: MutableRefObject<LeafletMap | null>;
}

function MapContent({ mapRef }: MapContentProps) {
  const map = useMap();

  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);

  return <></>;
}

function Map() {
  const [coords, setCoords] = useState<LatLongAndAccuracy | undefined>(undefined);
  const [geoError, setGeoError] = useState<GeolocationPositionError | undefined>(undefined);
  const [_themeInfo, setThemeKey] = useTheming();

  const mapRef = useRef<LeafletMap>(null);

  const styles = useStyles();
  const iconStyles = useIconStyles();

  function handleShowLocation() {
    if (mapRef.current && coords) {
      mapRef.current.flyTo([coords.lat, coords.lng], 14, {
        animate: true,
        duration: 2,
      });
    }
  }

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
      <header className={styles.header}>
        <Title1>{geoError ? `Geospatial API error: ${geoError.message}` : 'Browser Geo Demo'}</Title1>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button>Set theme</Button>
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              {AllThemes.map((t, i) => (
                <MenuItem key={i} onClick={() => setThemeKey(t.key)}>
                  {t.name}
                </MenuItem>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>

        {coords ? (
          <Button className={iconStyles.icon} onClick={handleShowLocation}>
            <LocationIcon /> Show my location
          </Button>
        ) : null}
      </header>
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

        <MapContent mapRef={mapRef} />
      </MapContainer>
      <footer className={styles.footer}>
        Map shows FA location + polygon and user's location with accuracy circle.
      </footer>
    </div>
  );
}

export default Map;
