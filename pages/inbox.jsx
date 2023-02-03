/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import styles from "@/styles/Inbox.module.css";
import { useUserContext } from "@/context/userContext";
import { AiOutlineRight } from "react-icons/ai";

export default function Inbox() {
  const { notifications } = useUserContext();

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.notifs}>
          {notifications?.map((notif) => (
            <Notification key={notif.sid} notif={notif} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

function Notification({ notif }) {
  const message = JSON.parse(notif.message);
  const recruiterName = notif.title.split("from")[0].trim();

  return (
    <div className={styles.notif}>
      <div className={styles.left}>
        <img
          src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${recruiterName}`}
          alt={recruiterName}
        />
      </div>
      <div className={styles.right}>
        <p>{notif.title}</p>
        <p>{message.message}</p>
      </div>
      {/* <AiOutlineRight className={styles.rightIcon} /> */}
    </div>
  );
}
