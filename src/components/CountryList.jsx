import Spinner from "../shared/components/Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import { useConsumeCitiesContext } from "../shared/contexts/CitiesContext";
function CountryList() {
  const { loading, cities } = useConsumeCitiesContext();
  const uniqueCountries = cities.reduce((accumulator, currentCity) => {
    // Check if current city's country already exists in accumulator
    const isCountryAlreadyAdded = accumulator.some(
      value => value.country === currentCity.country
    ); // If country doesn't exist in accumulator, add it

    if (!isCountryAlreadyAdded) {
      accumulator.push(currentCity);
    }

    return accumulator; // Always return the accumulator
  }, []);

  if (loading) return <Spinner />;
  if (!cities.length)
    return <Message message={"use the map to add your city"} />;

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map(country => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
