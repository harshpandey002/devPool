/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {}, []);

  return <Layout></Layout>;
}

export const getServerSideProps = async (ctx) => {
  // redirect test: always redirect to '/developers'
  ctx.res.setHeader("Location", "/developers");
  ctx.res.statusCode = 302;
  ctx.res.end();
  return {
    props: {},
  };
};
