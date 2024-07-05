import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        made by love &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;
