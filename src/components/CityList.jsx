import Spinner from "./Spinner";

import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
function CityList({ cities, loading }) {
  const citiesList = cities.map(city => <CityItem key={city.id} city={city} />);

  if (loading) return <Spinner />;
  if (!cities.length)
    return <Message message={"use the map to add your city"} />;
  return <ul className={styles.cityList}>{citiesList}</ul>;
}

export default CityList;
