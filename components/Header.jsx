import React from "react";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <h1>Dev Pool</h1>
      <ul>
        <li>Developers</li>
        <li>Inbox</li>
        <li>
          <button id={styles.cta}>Create Profile</button>
        </li>
      </ul>
    </div>
  );
}
