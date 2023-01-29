import CustomHeader from "@/components/CustomHeader";
import DevForm from "@/components/DevForm";
import Layout from "@/components/Layout";
import RecruiterForm from "@/components/RecruiterForm";
import styles from "@/styles/CreateProfile.module.css";
import Link from "next/link";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";

export default function CreateProfile() {
  const [role, setRole] = useState("Developer");

  return (
    <Layout customHeader={<CustomHeader />}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link href="/developers" id={styles.back}>
            <BsArrowLeft /> Back to developers
          </Link>
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
          {role === "Developer" ? <DevForm /> : <RecruiterForm />}
        </div>
      </div>
    </Layout>
  );
}
