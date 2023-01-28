import Layout from "@/components/Layout";
import styles from "@/styles/CreateProfile.module.css";
import { useState } from "react";
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

export default function CreateProfile() {
  const [skills, setSkills] = useState("");
  const [experiences, setExperiences] = useState([
    {
      companyName: "",
      jobTitle: "",
      description: "",
    },
  ]);
  const [projects, setProjects] = useState([
    {
      title: "",
      techStack: "",
      description: "",
    },
  ]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => console.log("Submit Triggered");

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <div className={styles.question}>
          <p>Name</p>
          <input type="text" name="name" placeholder="Harsh Pandey" />
        </div>
        <div className={styles.question}>
          <p>Portfolio</p>
          <input
            type="url"
            name="portfolio"
            placeholder="https://harshkumarpandey.com"
          />
        </div>
        <div className={styles.question}>
          <p>Bio</p>
          <textarea
            rows={3}
            name="bio"
            placeholder="Building https://blocktrain.info | Full-Stack | Blockchain Developer | Content Writer | Trader & Investor"
          />
        </div>
        <div className={styles.question}>
          <p>About</p>
          <textarea
            rows={5}
            name="about"
            placeholder="I’m a Front-End web3 developer with over two years of development experience with Reactjs/Nextjs. I'm perticulary good at developing responsive user interfaces for web-based applications with a focus on secure and smooth user experience."
          />
        </div>
        <Skills skills={skills} setSkills={setSkills} />
        <Experience experiences={experiences} setExperiences={setExperiences} />
      </form>
    </Layout>
  );
}

function Skills({ skills, setSkills }) {
  const skillClicked = (skill) => {
    setSkills((prev) => {
      if (prev) {
        return prev + ", " + skill;
      }
      return skill;
    });
  };

  return (
    <div className={styles.question}>
      <p>Skills</p>
      <input
        type="text"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        placeholder="Reactjs, Nextjs, Solidity, Etherjs, Hardhat, Git, Redux, Tailwindcss"
      />
      <div className={styles.skills}>
        {sampleSkills
          .filter((skill) => !skills.includes(skill))
          .map((skill) => (
            <span onClick={() => skillClicked(skill)} key={skill}>
              {skill}
            </span>
          ))}
      </div>
    </div>
  );
}

function Experience({ experiences, setExperiences }) {
  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        companyName: "",
        jobTitle: "",
        description: "",
      },
    ]);
  };

  const delExperience = (i) => {
    const newExp = JSON.parse(JSON.stringify(experiences));
    newExp.splice(i, 1);

    setExperiences(newExp);
  };

  return (
    <div className={styles.question}>
      <p>Experiences</p>
      {experiences.map((exp, i) => (
        <div key={i} className={styles.experience}>
          <div className={styles.inputGroup}>
            <div>
              <p>Company Name</p>
              <input type="text" placeholder="BlockTrain" />
            </div>
            <div>
              <p>Job Title</p>
              <input type="text" placeholder="Full-Stack Developer" />
            </div>
          </div>
          <div>
            <p>Description</p>
            <textarea rows={3} />
          </div>
          <div className={styles.action}>
            {experiences.length > 1 && (
              <button id={styles.delete} onClick={() => delExperience(i)}>
                Delete
              </button>
            )}
            <button onClick={addExperience}>Add</button>
          </div>
        </div>
      ))}
    </div>
  );
}
