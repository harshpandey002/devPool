/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <h1>Dev Pool</h1>
      <ul>
        <li>Developers</li>
        <li>Inbox</li>
        {/* <li>
          <button>Create Profile</button>
        </li> */}
        <li>
          <button id={styles.profile}>Harsh Pandey</button>
        </li>
      </ul>
    </div>
  );
}
