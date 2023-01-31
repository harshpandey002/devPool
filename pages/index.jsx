/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout";
import { useEffect } from "react";
import styles from "@/styles/Home.module.css";
import ConnectWallet from "@/components/ConnectWallet";

export default function Home() {
  return (
    <Layout customHeader={<></>}>
      <div className={styles.container}>
        <ConnectWallet />
      </div>
    </Layout>
  );
}

// export const getServerSideProps = async (ctx) => {
//   ctx.res.setHeader("Location", "/developers");
//   ctx.res.statusCode = 302;
//   ctx.res.end();
//   return {
//     props: {},
//   };
// };
