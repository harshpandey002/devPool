/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "@/styles/Developers.module.css";
import { BiLinkExternal } from "react-icons/bi";
import Layout from "@/components/Layout";
import Developer from "@/components/Developer";
import { useContract, useContractRead, useProvider } from "wagmi";
import contractABI from "@/abi/abi.json";
import { CONTRACT_ADDRESS } from "@/helpers/constants";

const getUserCountConfig = {
  address: CONTRACT_ADDRESS,
  abi: contractABI,
  functionName: "userCount",
};

export default function Developers() {
  const [developers, setDevelopers] = useState([]);
  const [activeDev, setActiveDev] = useState();
  const provider = useProvider();

  const { data: userCount } = useContractRead(getUserCountConfig);
  const contract = useContract({
    address: "0xbBc18f32E67304b2FB39bed2CB2f211eBBF030cB",
    abi: contractABI,
    signerOrProvider: provider,
  });

  useEffect(() => {
    if (!userCount) return;

    getDevelopers();
  }, [userCount?.toNumber()]);

  const handleClick = (username) => {
    setActiveDev(username);
  };

  async function getDevelopers() {
    try {
      const promises = [];

      for (let i = 0; i < userCount; i++) {
        promises.push(contract.users(i));
      }

      const res = await Promise.all(promises);
      const promisesCid = res.map((each) => fetch(each));

      const devsData = await Promise.all(promisesCid);
      const devsPromise = devsData.map((devs) => devs.json());

      const devs = await Promise.all(devsPromise);

      setDevelopers(devs);
    } catch (error) {
      console.log(error);
    }
  }

  const activeDeveloper = developers.filter(
    (dev) => dev.username === activeDev
  )[0];

  return (
    <Layout>
      <div className={styles.container}>
        <div
          style={{ width: activeDev ? "55%" : "100%" }}
          className={styles.left}
        >
          <div className={styles.cards}>
            {developers.map((developer) => (
              <DevCard
                handleClick={handleClick}
                key={developers.username}
                developer={developer}
                activedev={activeDev}
              />
            ))}
          </div>
        </div>
        {activeDev && (
          <div className={styles.right}>
            <Developer data={activeDeveloper} />
          </div>
        )}
      </div>
    </Layout>
  );
}

function DevCard({ developer, handleClick, activeDev }) {
  const { username, name, email, portfolio, bio } = developer;

  return (
    <div
      onClick={() => handleClick(username)}
      className={`${styles.card} ${
        activeDev == username ? styles.activeDev : ""
      }`}
    >
      <img
        src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${name}`}
        alt={name}
      />
      <div className={styles.basic}>
        <h2>{name}</h2>
        <a>
          {portfolio} <BiLinkExternal />
        </a>
        <p>{email}</p>
        <p>{bio}</p>
      </div>
    </div>
  );
}
