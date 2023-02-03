/* eslint-disable @next/next/no-img-element */
import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import ConnectWallet from "./ConnectWallet";

export default function Warning() {
  const address = useAddress();

  if (address) return <></>;

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
