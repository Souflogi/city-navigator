import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
// Shared Component
import Button from "../shared/components/Button";
// Context Api
import { useConsumeCitiesContext } from "../shared/contexts/CitiesContext";
// Custom Hooks
import { useGeolocation } from "../shared/hooks/useGeolocation";
import { useUrlPosition } from "../shared/hooks/useUrlPosition";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const [lat, lng] = useUrlPosition();
  const { cities } = useConsumeCitiesContext();
  const {
    isLoading: isLoadingPosition,
    getPosition: getGeolocationPosition,
    position: geoLocationPosition,
    setPosition: setGeoLocationPostion,
  } = useGeolocation();

  // Update map position if lat and lng are in the URL
  useEffect(() => {
    if (lat && lng) {
      setMapPosition([lat, lng]);
      setGeoLocationPostion(null);
    }
  }, [lat, lng]);

  // Update map position when geolocation position changes
  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition(geoLocationPosition);
    }
  }, [geoLocationPosition]);

  //Locating user
  const positioningHandler = () => {
    getGeolocationPosition();
  };

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type={"position"} action={positioningHandler}>
          {isLoadingPosition ? "loading..." : "get my location"}
        </Button>
      )}

      <MapContainer className={styles.map} center={mapPosition} zoom={16}>
        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

        {cities.map(city => {
          return (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                <span>{city.emoji}</span> <span>{city.cityName}</span> <br />
                <span>{city?.notes}</span>
              </Popup>
            </Marker>
          );
        })}
        <ClickDetector />
        <ViewCurrentCity center={mapPosition} />
      </MapContainer>
    </div>
  );
}
/************************************************** */
// Handles map clicks to navigate to a form with lat and lng in the URL

function ClickDetector() {
  const navigate = useNavigate();
  useMapEvents({
    click: e => {
      const { lat, lng } = e.latlng;

      e.originalEvent.preventDefault();
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });

  return null;
}

/********************************************** */
// Updates the map view to the current center position

function ViewCurrentCity({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      //  map.setView(center) ; OR
      map.flyTo(center, 10, {
        duration: 1, // Duration of animation in seconds
      });
    }
  }, [center, map]);

  return null;
}

export default Map;

/*The MapContainer component from react-leaflet does indeed have a center prop that can be used to set the initial center of the map. However, it does not automatically update the map's center when the center prop changes after the initial render. This is where the ViewCurrentCity component comes into play.

Why ViewCurrentCity Component is Needed
Dynamic Updates: The MapContainer component's center prop is used only during the initial render. To dynamically update the map's center position when the center state changes, you need to manually trigger the map to update its view. The ViewCurrentCity component does this by using the useMap hook and calling map.setView(center) whenever the center prop changes.

Encapsulation of Logic: Separating the logic for updating the map view into its own component makes the code cleaner and adheres to the principle of separation of concerns. This way, the main Map component remains focused on rendering the map and markers, while the ViewCurrentCity component handles view updates. */
