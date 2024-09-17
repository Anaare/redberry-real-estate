import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <img
        src="/images/redberry-logo.png"
        alt="redberry logo"
        className={styles.logo}
      />
    </header>
  );
}
