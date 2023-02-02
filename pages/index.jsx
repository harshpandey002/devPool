/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Home() {
  return (
    <Layout customHeader={<></>}>
      <div className={styles.container}>
        <ConnectWallet accentColor="#0d52a7" />
      </div>
    </Layout>
  );
}
