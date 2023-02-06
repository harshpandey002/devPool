/* eslint-disable @next/next/no-img-element */
import ConnectWallet from "@/components/ConnectWallet";
import Layout from "@/components/Layout";
import { useUserContext } from "@/context/userContext";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  const { user } = useUserContext();
  return (
    <>
      <Layout customHeader={<></>}>
        <div id={styles.blobPurple} />
        <div className={styles.container}>
          <h1>
            Create your decentralized <br /> <span>professional identity.</span>
          </h1>
          {user?.username ? (
            <>
              {/* <p>{user.username}</p> */}
              <Link href="/developers">
                <button>View Developers</button>
              </Link>
            </>
          ) : (
            <ConnectWallet />
          )}
          <img src="resume.png" alt="" />
        </div>
      </Layout>
    </>
  );
}
