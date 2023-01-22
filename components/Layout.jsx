import React from "react";
import styles from "@/styles/Layout.module.css";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.children}>{children}</div>
    </div>
  );
}
