import React from "react";
import styles from "@/styles/Layout.module.css";
import Header from "./Header";
import { useRouter } from "next/router";
import { useAccount, useNetwork } from "wagmi";
import useIsMounted from "hooks/useIsMounted";

export default function Layout({ children, customHeader }) {
  const router = useRouter();
  const { address, isConnecting, isDisconnected } = useAccount();
  const mounted = useIsMounted();

  if (mounted && router.asPath != "/" && !address) {
    router.push("/");
  }

  return (
    <div className={styles.wrapper}>
      {customHeader ? customHeader : <Header />}
      <div className={styles.children}>{children}</div>
    </div>
  );
}
