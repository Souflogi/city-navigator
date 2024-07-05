import AppNav from "./AppNav";
import CityList from "./CityList";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <CityList />
      <Footer />
    </div>
  );
}

export default Sidebar;
