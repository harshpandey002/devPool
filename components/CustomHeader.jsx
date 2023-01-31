/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/Header.module.css";
import Link from "next/link";

export default function CustomHeader({ formRef }) {
  return (
    <div className={styles.header}>
      <Link href="/">
        <h1>Dev Pool</h1>
      </Link>
      <ul>
        <li>
          <button form="createProfile" type="submit">
            Save
          </button>
        </li>
      </ul>
    </div>
  );
}
