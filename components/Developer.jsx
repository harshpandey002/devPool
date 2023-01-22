/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/Developer.module.css";
import { BiLinkExternal } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa";
import {
  AiFillGithub,
  AiFillInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";

export default function Developer({ developer }) {
  const { name, email, website, address, company } = developer;

  return (
    <div className={styles.container}>
      <div className={styles.basic}>
        <div className={styles.img}>
          <img
            src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${name}`}
            alt={name}
          />
        </div>
        <div className={styles.info}>
          <h4>{name}</h4>
          <p>{company.catchPhrase}</p>
          <a>
            {website} <BiLinkExternal />
          </a>
          <div className={styles.cta}>
            <span className={styles.socials}>
              <FaLinkedinIn className={styles.icon} />
              <AiFillInstagram className={styles.icon} />
              <AiOutlineTwitter className={styles.icon} />
              <AiFillGithub className={styles.icon} />
            </span>
            <button id={styles.approach}>Approach</button>
          </div>
        </div>
      </div>
    </div>
  );
}
