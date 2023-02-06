/* eslint-disable @next/next/no-img-element */
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ConnectWallet from "./ConnectWallet";

export default function Warning() {
  const address = useAddress();
  const router = useRouter();
  if (address || router.asPath === "/") return <></>;

  return (
    <p id="action-banner">
      <ConnectWallet />
    </p>
    // <p id="msg-banner">
    //   You are on the wrong network, <br /> Please{" "}
    //   <span onClick={onClick}>Switch to Goerli</span>.
    // </p>
  );
}
