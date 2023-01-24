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
      <div className={styles.skills}>
        {["Reactjs", "Nextjs", "Hardhat", "Etherjs", "Redux", "Electonjs"].map(
          (skill, _i) => (
            <span key={_i}>{skill}</span>
          )
        )}
      </div>
      <div className={styles.experience}>
        <p>Experiences</p>
        <div className={styles.exps}>
          <ExperienceCard />
          <ExperienceCard />
          <ExperienceCard />
        </div>
      </div>

      <div className={styles.experience}>
        <p>Projects</p>
        <div className={styles.exps}>
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </div>
  );
}

function ExperienceCard() {
  return (
    <div className={styles.expCard}>
      <p>
        TenX Tools <span>| Front-End Web3 Developer</span>
      </p>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni labore
        sit inventore cumque deleniti distinctio vitae asperiores earum porro
        eaque facilis ea culpa, est excepturi id cumque itaque esse doloremque!
      </p>
    </div>
  );
}

function ProjectCard() {
  return (
    <div className={styles.expCard}>
      <p>
        Dev Pool <span>| Developer Search Platform</span>
      </p>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni labore
        sit inventore cumque deleniti distinctio vitae asperiores earum porro
        eaque facilis ea culpa, est excepturi id cumque itaque esse doloremque!
      </p>
      <div className={styles.stack}>
        {["Reactjs", "Nextjs", "Hardhat", "Etherjs", "Redux", "Electonjs"].map(
          (skill, _i) => (
            <span key={_i}>{skill}</span>
          )
        )}
      </div>
    </div>
  );
}
