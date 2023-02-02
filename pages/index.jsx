/* eslint-disable @next/next/no-img-element */
import ConnectWallet from "@/components/ConnectWallet";
import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import { ThirdwebStorage } from "@thirdweb-dev/storage";

export default function Home() {
  const storage = new ThirdwebStorage();

  const onClick = async () => {
    try {
      const payload = {
        name: "NFT #1",
        description: "This is my first NFT",
        properties: [
          {
            name: "coolness",
            value: "very cool",
          },
        ],
      };

      const uri = await storage.upload(payload);
      const url = await storage.resolveScheme(uri);
      console.log(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout customHeader={<></>}>
      <div className={styles.container}>
        <ConnectWallet />
        <button onClick={onClick}>Ipfs</button>
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
