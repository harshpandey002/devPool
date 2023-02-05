/* eslint-disable @next/next/no-img-element */
import { useUserContext } from "@/context/userContext";
import useNotify from "@/hooks/useNotify";
import styles from "@/styles/DeveloperDetail.module.css";
import { useRef, useState } from "react";
import {
  AiFillGithub,
  AiOutlineLink,
  AiOutlineTwitter,
  AiOutlineClose,
} from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa";

export default function Developer({ data }) {
  const { name, email, portfolio, bio, skills } = data;
  const [showModal, setShowModal] = useState(false);

  const { user } = useUserContext();

  const isRecruiter = user?.role === "recruiter";

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      {user?.role === "recruiter" && showModal && (
        <Modal recruiter={user} developer={data} closeModal={closeModal} />
      )}
      <div className={styles.basic}>
        <div className={styles.img}>
          <img
            src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${name}`}
            alt={name}
          />
        </div>
        <div className={styles.info}>
          <h4>{name}</h4>
          <p>{bio}</p>
          <a>
            {portfolio} <BiLinkExternal />
          </a>
          <div className={styles.cta}>
            <span className={styles.socials}>
              <FaLinkedinIn className={styles.icon} />
              <AiOutlineTwitter className={styles.icon} />
              <AiFillGithub className={styles.icon} />
              <AiOutlineLink className={styles.icon} />
            </span>
            {isRecruiter && (
              <button onClick={() => setShowModal(true)}>Approach</button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.skills}>
        {skills.split(",").map((skill, _i) => (
          <span key={_i}>{skill}</span>
        ))}
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

function Modal({ recruiter, developer, closeModal }) {
  const { wallet, name: devName } = developer;

  const { jobs } = recruiter;
  const [selected, setSelected] = useState(0);
  const inputRef = useRef();

  const notify = useNotify();

  const sendJD = () => {
    try {
      const devBody = {
        ...jobs[selected],
        message: inputRef.current.value,
        companyName: recruiter.companyName,
      };

      const recBody = {
        name: developer.name,
        wallet: developer.wallet,
        message: `You approached ${devName} for ${jobs[selected].jobTitle} role.`,
      };

      const devPayload = {
        title: `${recruiter.name} from ${recruiter.companyName}`,
        body: JSON.stringify(devBody),
        cta: "",
        img: "",
      };

      const recPayload = {
        title: `Dev Pool`,
        body: JSON.stringify(recBody),
        cta: "",
        img: "",
      };

      notify("0x89564b31B65D39855c2adAD63dF76d89114ACA92", devPayload);
      // notify(recruiter.wallet, recPayload);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="overlay" />
      <div className="modal">
        <div className="modal-header">
          <p>Job Description</p>
          <AiOutlineClose onClick={closeModal} className="close-icon" />
        </div>
        <div className="modal-body">
          <div className={styles.jds}>
            {jobs.map((job, i) => (
              <p
                onClick={() => setSelected(i)}
                className={`${styles.jd} ${
                  selected === i ? styles.selected : ""
                }`}
                key={i}
              >
                {job.jobTitle}
              </p>
            ))}
            <textarea ref={inputRef} rows={3} placeholder="Message" />
          </div>
        </div>
        <div className="modal-cta">
          <button onClick={closeModal}>Close</button>
          <button onClick={sendJD}>Send JD</button>
        </div>
      </div>
    </>
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
