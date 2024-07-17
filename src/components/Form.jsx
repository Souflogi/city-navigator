// Import necessary libraries and components
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import Message from "../shared/components/Message";
import BackButton from "../shared/components/BackButton";
import Button from "../shared/components/Button";
import Spinner from "../shared/components/Spinner";
import { useUrlPosition } from "../shared/hooks/useUrlPosition";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useConsumeCitiesContext } from "../shared/contexts/CitiesContext";

// Convert country code to emoji
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// Base URL for geocoding API
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  // State variables for form fields and geocoding
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState(null);

  // Get latitude and longitude from URL
  const [lat, lng] = useUrlPosition();

  // State variables for loading and error handling
  const [isLoadingGeoLocoding, setIsloadingGeoLocoding] = useState(null);
  const [geocodingError, setGeocodingError] = useState("");

  // React Router hook for navigation
  const navigate = useNavigate();

  const { addCityToDb } = useConsumeCitiesContext();

  // Fetch city data based on latitude and longitude
  useEffect(() => {
    const fecthCityData = async () => {
      if (!lat && !lng) return;
      try {
        setIsloadingGeoLocoding(true);
        setGeocodingError("");
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();

        if (data.countryCode === "")
          throw new Error(
            "That does not seem to be a city. Click somewhere else 🙂"
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

  // Handle form submission
  const handelOnSubmit = e => {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    addCityToDb(newCity);
    navigate("../cities");
  };

  // Render spinner while loading geolocation
  if (isLoadingGeoLocoding) return <Spinner />;

  // Render error message if there is a geocoding error
  if (geocodingError !== "") return <Message message={geocodingError} />;

  // Render message if no latitude and longitude are provided
  if (!lat && !lng)
    return (
      <Message
        message={
          "Ooops! Something went wrong, try clicking somewhere on the map."
        }
      />
    );
  // Render the form
  else
    return (
      <form className={styles.form} onSubmit={handelOnSubmit}>
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
          <DatePicker
            id="date"
            onChange={date => setDate(date)}
            selected={date}
            dateFormat={"dd/MM/yy"}
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
