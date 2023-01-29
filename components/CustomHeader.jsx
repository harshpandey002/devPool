/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/Header.module.css";

export default function CustomHeader({ formRef }) {
  return (
    <div className={styles.header}>
      <h1>Dev Pool</h1>
      <ul>
        <li>Developers</li>
        <li>
          <button form="createProfile" type="submit">
            Save
          </button>
        </li>
      </ul>
    </div>
  );
}
