import CustomHeader from "@/components/CustomHeader";
import DevForm from "@/components/DevForm";
import Layout from "@/components/Layout";
import RecruiterForm from "@/components/RecruiterForm";
import styles from "@/styles/CreateProfile.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import contractABI from "@/abi/abi.json";
import { CONTRACT_ADDRESS } from "@/helpers/constants";
import { toTitleCase } from "@/helpers/functions";
import { useRouter } from "next/router";
import { useContract, useContractRead } from "@thirdweb-dev/react";

export default function CreateProfile() {
  const router = useRouter();
  const username = router.query.username;

  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: userURL } = useContractRead(
    contract,
    "userByUsername",
    username
  );

  const [user, setUser] = useState(null);
  const [role, setRole] = useState("Developer");

  useEffect(() => {
    if (!userURL) return;
    getUserDetails();
  }, [userURL]);

  async function getUserDetails() {
    const res = await fetch(userURL);
    const data = await res.json();
    setUser(data);
    setRole(toTitleCase(data?.role));
  }

  const userId = user?.id;

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
          {role === "Developer" ? (
            <DevForm userId={userId} user={user} />
          ) : (
            <RecruiterForm userId={userId} user={user} />
          )}
        </div>
      </div>
    </Layout>
  );
}
