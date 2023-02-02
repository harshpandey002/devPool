import CustomHeader from "@/components/CustomHeader";
import DevForm from "@/components/DevForm";
import Layout from "@/components/Layout";
import RecruiterForm from "@/components/RecruiterForm";
import styles from "@/styles/CreateProfile.module.css";
import Link from "next/link";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import contractABI from "@/abi/abi.json";
import { CONTRACT_ADDRESS } from "@/helpers/constants";

const getUserCountConfig = {
  address: CONTRACT_ADDRESS,
  abi: contractABI,
  functionName: "userCount",
};

export default function CreateProfile() {
  const [role, setRole] = useState("Developer");

  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: userCount } = useContractRead(contract, "userCount");

  const userId = userCount?.toNumber();

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
            <DevForm userId={userId} />
          ) : (
            <RecruiterForm userId={userId} />
          )}
        </div>
      </div>
    </Layout>
  );
}
