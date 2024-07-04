import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to={"/"}>Cities</NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
