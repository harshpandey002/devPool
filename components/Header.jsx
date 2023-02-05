/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { useUserContext } from "@/context/userContext";

export default function Header() {
  const { user } = useUserContext();

  return (
    <div className={styles.header}>
      <Link href="/">
        <h1>Dev Pool</h1>
      </Link>
      <ul>
        <Link href="/developers">
          <li>Developers</li>
        </Link>
        <Link href="/inbox">
          <li>Inbox</li>
        </Link>
        {user?.username ? (
          <Link href={`/update/${user.username}`}>
            <li>
              <button>{user.username}</button>
            </li>
          </Link>
        ) : (
          <Link href="/create">
            <li>
              <button>Create Profile</button>
            </li>
          </Link>
        )}
        {/* <li>
          <button id={styles.profile}>Harsh Pandey</button>
        </li> */}
      </ul>
    </div>
  );
}
