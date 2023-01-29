import styles from "@/styles/CreateProfile.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
  name: "",
  username: "",
  companyName: "",
};

const jobsDefaultValues = {
  jobDescription: "",
  jobTitle: "",
  skills: "",
};

export default function RecruiterForm({}) {
  const [jobs, setJobs] = useState([jobsDefaultValues]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    const formData = {
      ...data,
      role: "recruiter",
      jobs,
    };

    console.log(formData);
  };

  return (
    <form id="createProfile" onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.question}>
        <p>Name</p>
        <input type="text" {...register("name")} placeholder="Furqan Rydhan" />
      </div>
      <div className={styles.question}>
        <p>Username</p>
        <input type="text" {...register("username")} placeholder="furqanR" />
      </div>
      <div className={styles.question}>
        <p>Company Name</p>
        <input type="url" {...register("companyName")} placeholder="Thirdweb" />
      </div>
      <Jobs jobs={jobs} setJobs={setJobs} />
    </form>
  );
}

function Jobs({ jobs, setJobs }) {
  const addJob = (i) => {
    const newJobs = JSON.parse(JSON.stringify(jobs));

    newJobs.splice(i + 1, 0, jobsDefaultValues);

    setJobs(newJobs);
  };

  const delJob = (i) => {
    const newJobs = JSON.parse(JSON.stringify(jobs));
    newJobs.splice(i, 1);

    setJobs(newJobs);
  };

  const onChange = (e, i) => {
    const newJobs = JSON.parse(JSON.stringify(jobs));
    newJobs[i][e.target.name] = e.target.value;

    setJobs(newJobs);
  };

  return (
    <div className={styles.question}>
      <p>Jobs</p>
      {jobs.map((job, idx) => (
        <div key={idx} className={styles.experience}>
          <div className={styles.inputGroup}>
            <div>
              <p>Job Title</p>
              <input
                type="text"
                onChange={(e) => onChange(e, idx)}
                value={job.jobTitle}
                name="jobTitle"
                placeholder="Front-End Developer"
              />
            </div>
            <div>
              <p>Skills</p>
              <input
                type="text"
                onChange={(e) => onChange(e, idx)}
                value={job.skills}
                name="skills"
                placeholder="Reactjs, Nextjs, Tailwindcss, Solidity, Nodejs, Mongodb"
              />
            </div>
          </div>
          <div>
            <p>Job Description</p>
            <textarea
              rows={4}
              onChange={(e) => onChange(e, idx)}
              value={job.jobDescription}
              name="jobDescription"
              placeholder=""
            />
          </div>
          <div className={styles.action}>
            {jobs.length > 1 && (
              <button
                type="button"
                id={styles.delete}
                onClick={() => delJob(idx)}
              >
                Delete
              </button>
            )}
            <button type="button" onClick={() => addJob(idx)}>
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
