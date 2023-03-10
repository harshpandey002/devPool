import styles from "@/styles/CreateProfile.module.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { CONTRACT_ADDRESS } from "@/helpers/constants";
import { useRouter } from "next/router";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { toast } from "react-hot-toast";

const getDefaultValues = (user) => ({
  name: user?.name || "",
  username: user?.username || "",
  companyName: user?.companyName || "",
});

const jobsDefaultValues = {
  jobDescription: "",
  jobTitle: "",
  skills: "",
};

export default function RecruiterForm({ userId, user }) {
  const [jobs, setJobs] = useState([jobsDefaultValues]);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: getDefaultValues(user),
  });
  const address = useAddress();
  const storage = new ThirdwebStorage();

  const router = useRouter();

  const { contract } = useContract(CONTRACT_ADDRESS);
  const { mutateAsync: updateUser } = useContractWrite(contract, "updateUser");
  const { mutateAsync: createUser } = useContractWrite(contract, "newUser");
  useEffect(() => {
    if (!user?.username) return;

    setJobs(user?.jobs || [jobsDefaultValues]);
    reset(getDefaultValues(user));
  }, [user]);

  const onSubmit = async (data) => {
    if (!data.username || !user.username) {
      toast.error("Username is Required.");
      return;
    }

    const formData = {
      id: userId,
      wallet: address,
      role: "recruiter",
      ...data,
      jobs,
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
          error: <b>Could not Update!</b>,
        });
      } else {
        await toast.promise(createUser([formData.username, url]), {
          loading: "Creating you profile...",
          success: <b>Profile Created!</b>,
          error: <b>Some Error Occured!</b>,
        });
      }
      router.push(`/developers`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form id="createProfile" onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.question}>
        <p>Name</p>
        <input type="text" {...register("name")} placeholder="Furqan Rydhan" />
      </div>
      {!user?.username ? (
        <div className={styles.question}>
          <p>Username</p>
          <input type="text" {...register("username")} placeholder="furqanR" />
        </div>
      ) : null}
      <div className={styles.question}>
        <p>Company Name</p>
        <input
          type="text"
          {...register("companyName")}
          placeholder="Thirdweb"
        />
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
      {jobs?.map((job, idx) => (
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
