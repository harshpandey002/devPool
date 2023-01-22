/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { BiLinkExternal } from "react-icons/bi";
import Layout from "../components/Layout";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.cards}>
          {users.map((user) => (
            <Card key={user.id} user={user} />
          ))}
          {users.map((user) => (
            <Card key={user.id} user={user} />
          ))}
          {users.map((user) => (
            <Card key={user.id} user={user} />
          ))}
          {users.map((user) => (
            <Card key={user.id} user={user} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

function Card({ user }) {
  const { name, email, website, address, company } = user;
  const { street, suite, city } = address;

  return (
    <div className={styles.card}>
      <img
        src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${user.name}`}
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
