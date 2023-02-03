/* eslint-disable @next/next/no-img-element */
import ConnectWallet from "@/components/ConnectWallet";
import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import { useAddress } from "@thirdweb-dev/react";
export default function Home() {
  const address = useAddress();
  return (
    <Layout customHeader={<></>}>
      <div className={styles.container}>
        <p>{address}</p>
      </div>
    </Layout>
  );
}
