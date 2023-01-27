/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <div className={styles.header}>
      <h1>Dev Pool</h1>
      <ul>
        <li>Developers</li>
        <li>Inbox</li>
        <Link href="/profile/create">
          <li>
            <button>Create Profile</button>
          </li>
        </Link>
        {/* <li>
          <button id={styles.profile}>Harsh Pandey</button>
        </li> */}
      </ul>
    </div>
  );
}
