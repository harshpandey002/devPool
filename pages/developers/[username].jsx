import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import Developer from "@/components/Developer";
import styles from "@/styles/Resume.module.css";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "@/helpers/constants";

export default function Resume() {
  const [dev, setDev] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const username = router.query.username;
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: userURL } = useContractRead(
    contract,
    "userByUsername",
    username
  );

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
    if (!userURL) return;
    getUserDetails();

    return () => {
      setLoading(false);
    };
  }, [userURL]);

  async function getUserDetails() {
    try {
      const res = await fetch(userURL);
      const data = await res.json();
      setDev(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <Layout customHeader={<></>}>
      <div className={styles.container}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Link href="/developers" id={styles.back}>
            <BsArrowLeft /> All developers
          </Link>
        )}
        {dev ? <Developer data={dev} /> : null}
      </div>
    </Layout>
  );
}
