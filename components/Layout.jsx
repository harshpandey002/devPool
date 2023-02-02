import React, { useEffect } from "react";
import styles from "@/styles/Layout.module.css";
import Header from "./Header";
import { useRouter } from "next/router";
import { useAddress } from "@thirdweb-dev/react";

export default function Layout({ children, customHeader }) {
  const router = useRouter();
  const address = useAddress();

  // useEffect(() => {
  //   if (address === undefined) return;
  //   if (router.asPath != "/" && !address) {
  //     router.push("/");
  //   }
  // }, [address]);

  return (
    <div className={styles.wrapper}>
      {customHeader ? customHeader : <Header />}
      <div className={styles.children}>{children}</div>
    </div>
  );
}
