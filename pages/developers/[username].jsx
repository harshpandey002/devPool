import Layout from "@/components/Layout";
import React from "react";
import Developer from "@/components/Developer";
import styles from "@/styles/Resume.module.css";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const testDev = {
  name: "Harsh Kumar Pandey",
  username: "harshpandey002",
  website: "https://harshkumarpandey.com",
  company: {
    catchPhrase: "Full-Stack Blockchain Developer",
  },
};

export default function Resume() {
  return (
    <Layout customHeader={<></>}>
      <div className={styles.container}>
        <Link href="/developers" id={styles.back}>
          <BsArrowLeft /> All developers
        </Link>
        <Developer data={testDev} />
      </div>
    </Layout>
  );
}
