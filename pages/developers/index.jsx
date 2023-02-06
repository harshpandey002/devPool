/* eslint-disable @next/next/no-img-element */
import Developer from "@/components/Developer";
import Layout from "@/components/Layout";
import styles from "@/styles/Developers.module.css";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";

import { CONTRACT_ADDRESS } from "@/helpers/constants";
import { toast } from "react-hot-toast";

export default function Developers() {
  const [developers, setDevelopers] = useState([]);
  const [activeDev, setActiveDev] = useState();

  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: userCount } = useContractRead(contract, "userCount");

  let check = false;

  useEffect(() => {
    if (!userCount || check) return;

    getDevelopers();
  }, [userCount?.toNumber()]);

  const handleClick = (username) => {
    setActiveDev(username);
  };

  async function getDevelopers() {
    check = true;
    try {
      const promises = [];
      toast("Started");
      for (let i = 0; i < userCount.toNumber(); i++) {
        promises.push(contract.call("users", i));
      }

      const res = await toast.promise(Promise.all(promises), {
        loading: "Fetching developers...",
        success: <b>Done</b>,
        error: <b>Some error occured</b>,
      });
      const promisesCid = res.map((each) => fetch(each));

      const devsData = await Promise.all(promisesCid);
      const devsPromise = devsData.map((devs) => devs.json());

      const devs = await Promise.all(devsPromise);

      setDevelopers(devs);
      check = false;
    } catch (error) {
      check = false;
      console.log(error);
    }
  }

  const activeDeveloper = developers.filter(
    (dev) => dev.username === activeDev
  )[0];

  const DEVELOPERS = developers.filter((dev) => dev.role === "developer");

  return (
    <Layout>
      <div className={styles.container}>
        <div
          style={{ width: activeDev ? "55%" : "100%" }}
          className={styles.left}
        >
          <div className={styles.cards}>
            {DEVELOPERS.map((developer) => (
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
        <a href={portfolio} target="_balnk">
          {portfolio} <BiLinkExternal />
        </a>
        <p>{email}</p>
        <p>{bio}</p>
      </div>
    </div>
  );
}
