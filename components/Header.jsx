import React from "react";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <h1>Harsh Pandey</h1>
      <ul>
        <li>Home</li>
        <li>Pricing</li>
        <li>Products</li>
        <li>About</li>
      </ul>
    </div>
  );
}
