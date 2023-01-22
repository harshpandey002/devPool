/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { BiLinkExternal } from "react-icons/bi";
import Layout from "@/components/Layout";
import Developer from "@/components/Developer";

export default function Home() {
  const [developers, setDevelopers] = useState([]);
  const [devId, setDevId] = useState();

  useEffect(() => {
    getDevelopers();
  }, []);

  const handleClick = (id) => {
    setDevId(id);
    // let timer;
    // timer = setTimeout(() => {
    //   clearTimeout(timer);
    //   setDevId(false);
    // }, 2000);
  };

  async function getDevelopers() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setDevelopers(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div style={{ width: devId ? "55%" : "100%" }} className={styles.left}>
          <div className={styles.cards}>
            {developers.map((developer) => (
              <Card
                handleClick={handleClick}
                key={developers.id}
                developer={developer}
              />
            ))}
          </div>
        </div>
        {devId && (
          <div className={styles.right}>
            <Developer />
          </div>
        )}
      </div>
    </Layout>
  );
}

function Card({ developer, handleClick }) {
  const { id, name, email, website, address, company } = developer;
  const { street, suite, city } = address;

  return (
    <div onClick={() => handleClick(id)} className={styles.card}>
      <img
        src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${name}`}
        alt=""
      />
      <div className={styles.basic}>
        <h2>{name}</h2>
        <a>
          {website} <BiLinkExternal />
        </a>
        <p>{email}</p>
        <p>{company.catchPhrase}</p>
      </div>
    </div>
  );
}
