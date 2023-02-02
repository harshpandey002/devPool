/* eslint-disable @next/next/no-img-element */
import ConnectWallet from "@/components/ConnectWallet";
import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import { ThirdwebStorage } from "@thirdweb-dev/storage";

export default function Home() {
  return (
    <Layout customHeader={<></>}>
      <div className={styles.container}>
        <ConnectWallet />
      </div>
    </Layout>
  );
}
