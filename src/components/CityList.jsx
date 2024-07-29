import Spinner from "../shared/components/Spinner";

import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "../shared/components/Message";
import { useCitiesContext } from "../shared/contexts/CitiesContext";
function CityList() {
  const { cities, loading } = useCitiesContext();

  const citiesList = cities.map(city => <CityItem key={city.id} city={city} />);

  if (loading) return <Spinner />;

  if (!cities.length)
    return <Message message={"use the map to add your city"} />;
  else return <ul className={styles.cityList}>{citiesList}</ul>;
}

export default CityList;
