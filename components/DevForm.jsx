import styles from "@/styles/CreateProfile.module.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { CONTRACT_ADDRESS } from "@/helpers/constants";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

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

const getDefaultValues = (user) => ({
  name: user?.name || "",
  username: user?.username || "",
  email: user?.email || "",
  portfolio: user?.portfolio || "",
  bio: user?.bio || "",
  about: user?.about || "",
  twitter: user?.twitter || "",
  linkedin: user?.linkedin || "",
  github: user?.github || "",
});

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

export default function DevForm({ userId, user }) {
  const [skills, setSkills] = useState("");
  const [experiences, setExperiences] = useState([expDefaultValues]);
  const [projects, setProjects] = useState([projDefaultValues]);
  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: getDefaultValues(user),
  });
  const storage = new ThirdwebStorage();
  const address = useAddress();
  const router = useRouter();

  const { contract } = useContract(CONTRACT_ADDRESS);
  const { mutateAsync: updateUser } = useContractWrite(contract, "updateUser");
  const { mutateAsync: createUser } = useContractWrite(contract, "newUser");

  useEffect(() => {
    if (!user?.username) return;

    setSkills(user?.skills || "");
    setProjects(user?.projects || [projDefaultValues]);
    setExperiences(user?.experiences || [expDefaultValues]);
    reset(getDefaultValues(user));
  }, [user]);

  const onSubmit = async (data) => {
    const formData = {
      id: userId,
      wallet: address,
      role: "developer",
      ...data,
      skills,
      experiences,
      projects,
    };

    try {
      const uri = await toast.promise(storage.upload(formData), {
        loading: "Uploading to IPFS...",
        success: <b>Uploaded to IPFS!</b>,
        error: <b>Could not upload</b>,
      });
      const url = storage.resolveScheme(uri);

      if (user) {
        await toast.promise(updateUser([user.id, url]), {
          loading: "Updating your info...",
          success: <b>Profile Updated!</b>,
          error: <b>Could not Update</b>,
        });
      } else {
        await toast.promise(createUser([formData.username, url]), {
          loading: "Creating you profile...",
          success: <b>Profile Created!</b>,
          error: <b>Some Error Occured</b>,
        });
      }
      router.push(`/developers/${formData.username}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form id="createProfile" onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.question}>
        <p>Name</p>
        <input type="text" {...register("name")} placeholder="Harsh Pandey" />
      </div>
      {!user?.username ? (
        <div className={styles.question}>
          <p>Username</p>
          <input
            type="text"
            {...register("username")}
            placeholder="harshpandey002"
          />
        </div>
      ) : null}
      <div className={styles.question}>
        <p>Email</p>
        <input
          type="text"
          {...register("email")}
          placeholder="coding.harshp@gmail.com"
        />
      </div>
      <div className={styles.question}>
        <p>Portfolio</p>
        <input
          type="url"
          {...register("portfolio")}
          placeholder="https://harshkumarpandey.com"
        />
      </div>
      <div className={styles.question}>
        <p>Bio</p>
        <textarea
          rows={3}
          {...register("bio")}
          placeholder="Building https://blocktrain.info | Full-Stack | Blockchain Developer | Content Writer | Trader & Investor"
        />
      </div>
      <div className={styles.question}>
        <p>About</p>
        <textarea
          rows={5}
          {...register("about")}
          placeholder="I’m a Front-End web3 developer with over two years of development experience with Reactjs/Nextjs. I'm particularly good at developing responsive user interfaces for web-based applications with a focus on secure and smooth user experience."
        />
      </div>
      <Skills skills={skills} setSkills={setSkills} />
      <Experience experiences={experiences} setExperiences={setExperiences} />
      <Project projects={projects} setProjects={setProjects} />
      <div className={styles.question}>
        <p>Twitter</p>
        <input
          type="url"
          {...register("twitter")}
          placeholder="https://twitter.com/harshpandey002"
        />
      </div>
      <div className={styles.question}>
        <p>Github</p>
        <input
          type="url"
          {...register("github")}
          placeholder="https://github.com/harshpandey002"
        />
      </div>
      <div className={styles.question}>
        <p>LinkedIn</p>
        <input
          type="url"
          {...register("linkedin")}
          placeholder="https://www.linkedin.com/in/harshpandey002/"
        />
      </div>
    </form>
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
  const addExperience = (i) => {
    const newExp = JSON.parse(JSON.stringify(experiences));

    newExp.splice(i + 1, 0, expDefaultValues);

    setExperiences(newExp);
  };

  const delExperience = (i) => {
    const newExp = JSON.parse(JSON.stringify(experiences));
    newExp.splice(i, 1);

    setExperiences(newExp);
  };

  const onChange = (e, i) => {
    const newExp = JSON.parse(JSON.stringify(experiences));
    newExp[i][e.target.name] = e.target.value;

    setExperiences(newExp);
  };

  return (
    <div className={styles.question}>
      <p>Experiences</p>
      {experiences.map((exp, idx) => (
        <div key={idx} className={styles.experience}>
          <div className={styles.inputGroup}>
            <div>
              <p>Company Name</p>
              <input
                type="text"
                onChange={(e) => onChange(e, idx)}
                value={exp.companyName}
                name="companyName"
                placeholder="BlockTrain"
              />
            </div>
            <div>
              <p>Job Title</p>
              <input
                type="text"
                onChange={(e) => onChange(e, idx)}
                value={exp.jobTitle}
                name="jobTitle"
                placeholder="Full-Stack Developer"
              />
            </div>
          </div>
          <div>
            <p>Description</p>
            <textarea
              rows={4}
              onChange={(e) => onChange(e, idx)}
              value={exp.description}
              name="description"
              placeholder="An educational platform where user can learn everything user need to know about Web3 and Blockchain with a series of articles, in-depth tutorials, structured courses and complete project guides."
            />
          </div>
          <div className={styles.action}>
            {experiences.length > 1 && (
              <button
                type="button"
                id={styles.delete}
                onClick={() => delExperience(idx)}
              >
                Delete
              </button>
            )}
            <button type="button" onClick={() => addExperience(idx)}>
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Project({ projects, setProjects }) {
  const addProject = (i) => {
    const newProj = JSON.parse(JSON.stringify(projects));

    newProj.splice(i + 1, 0, projDefaultValues);

    setProjects(newProj);
  };

  const delProject = (i) => {
    const newProj = JSON.parse(JSON.stringify(projects));
    newProj.splice(i, 1);

    setProjects(newProj);
  };

  const onChange = (e, i) => {
    const newProj = JSON.parse(JSON.stringify(projects));
    newProj[i][e.target.name] = e.target.value;

    setProjects(newProj);
  };

  return (
    <div className={styles.question}>
      <p>Projects</p>
      {projects.map((exp, idx) => (
        <div key={idx} className={styles.experience}>
          <div className={styles.inputGroup}>
            <div>
              <p>Project Title</p>
              <input
                type="text"
                onChange={(e) => onChange(e, idx)}
                value={exp.title}
                name="title"
                placeholder="Dopp"
              />
            </div>
            <div>
              <p>Project Type</p>
              <input
                type="text"
                onChange={(e) => onChange(e, idx)}
                value={exp.projectType}
                name="projectType"
                placeholder="Crowdfunding Platform"
              />
            </div>
          </div>
          <div>
            <p>Tech Stack</p>
            <input
              type="text"
              onChange={(e) => onChange(e, idx)}
              value={exp.techStack}
              name="techStack"
              placeholder="Nextjs, Solidity, Tailwindcss, Firebase"
            />
          </div>
          <div>
            <p>Description</p>
            <textarea
              rows={4}
              onChange={(e) => onChange(e, idx)}
              value={exp.description}
              name="description"
              placeholder="Designed and Developed this Dapp where user can raise or donate funds to different campaigns of their choice. Payments are done in Goerli Ether."
            />
          </div>
          <div className={styles.action}>
            {projects.length > 1 && (
              <button
                type="button"
                id={styles.delete}
                onClick={() => delProject(idx)}
              >
                Delete
              </button>
            )}
            <button type="button" onClick={() => addProject(idx)}>
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
