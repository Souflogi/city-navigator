import styles from "./Button.module.css";
function Button({ children, type, action }) {
  return (
    <button onClick={action} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
