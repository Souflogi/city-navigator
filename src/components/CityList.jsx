import styles from "./CityList.module.css";
function CityList() {
  return (
    <ul className={styles.cityList}>
      <li>Casablanca</li>
      <li>Rabat</li>
    </ul>
  );
}

export default CityList;
