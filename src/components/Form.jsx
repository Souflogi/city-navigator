// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
// `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

import { useEffect, useState } from "react";
import Message from "../shared/components/Message";

import styles from "./Form.module.css";
import Button from "../shared/components/Button";
import BackButton from "../shared/components/BackButton";
import { useUrlPosition } from "../shared/hooks/useUrlPosition";
import Spinner from "../shared/components/Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState(null);

  const [lat, lng] = useUrlPosition();

  const [isLoadingGeoLocoding, setIsloadingGeoLocoding] = useState(null);
  const [geocodingError, setGeocodingError] = useState("");

  useEffect(() => {
    const fecthCityData = async () => {
      try {
        setIsloadingGeoLocoding(true);
        setGeocodingError("");
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();
        console.log(data);

        if (data.countryCode === "")
          throw new Error(
            "That dose not seem to be a city. Click somewhere else 🙂"
          );
        setCityName(data.city || data.locality || "Unknown place");
        setCountry(data.countryName || "");
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        console.error("Error:", error);
        setGeocodingError(error.message);
      } finally {
        setIsloadingGeoLocoding(false);
      }
    };

    fecthCityData();
  }, [lat, lng]);

  if (isLoadingGeoLocoding) return <Spinner />;
  if (geocodingError !== "") return <Message message={geocodingError} />;
  else
    return (
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="cityName">City name</label>
          <input
            id="cityName"
            onChange={e => setCityName(e.target.value)}
            value={cityName}
          />
          <span className={styles.flag} data-tooltip="country name">
            {emoji}
          </span>
        </div>

        <div className={styles.row}>
          <label htmlFor="date">When did you go to {cityName}?</label>
          <input
            id="date"
            onChange={e => setDate(e.target.value)}
            value={date}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="notes">Notes about your trip to {cityName}</label>
          <textarea
            id="notes"
            onChange={e => setNotes(e.target.value)}
            value={notes}
          />
        </div>

        <div className={styles.buttons}>
          <Button type={"primary"}>Add</Button>
          <BackButton />
        </div>
      </form>
    );
}

export default Form;
