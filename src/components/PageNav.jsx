import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <nav>
      <ul className={styles.nav}>
        <li>
          <NavLink to={"/"}>Home page</NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/pricing"}>Pricing</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
