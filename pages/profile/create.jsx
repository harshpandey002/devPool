import CustomHeader from "@/components/CustomHeader";
import DevForm from "@/components/DevForm";
import Layout from "@/components/Layout";
import styles from "@/styles/CreateProfile.module.css";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const sampleSkills = [
  "Reactjs",
  "Nextjs",
  "Solidity",
  "Etherjs",
  "Hardhat",
  "Git",
  "Redux",
  "Tailwindcss",
];

const defaultValues = {
  name: "",
  portfolio: "",
  bio: "",
  about: "",
};

const expDefaultValues = {
  companyName: "",
  jobTitle: "",
  description: "",
};

const projDefaultValues = {
  title: "",
  projectType: "",
  techStack: "",
  description: "",
};

export default function CreateProfile() {
  const [role, setRole] = useState("Developer");

  return (
    <Layout customHeader={<CustomHeader />}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.roles}>
            {["Developer", "Recruiter"].map((rol) => (
              <span
                onClick={() => setRole(rol)}
                className={role === rol ? styles.activeRole : ""}
                key={rol}
              >
                {rol}
              </span>
            ))}
          </div>
          {role === "Developer" ? <DevForm /> : <></>}
        </div>
      </div>
    </Layout>
  );
}
