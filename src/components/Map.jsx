import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const navigate = useNavigate();
  const [searshParams, setSearchParams] = useSearchParams();
  const lat = searshParams.get("lat");
  const lng = searshParams.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("")}>
      <h1>map</h1>
      <p>
        Position : {lat} {lng}
      </p>
      <button onClick={() => setSearchParams({ lat: 20, lng: 20 })}>
        Change Position
      </button>
    </div>
  );
}

export default Map;
