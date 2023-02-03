/* eslint-disable @next/next/no-img-element */
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

export default function Warning() {
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const address = useAddress();

  // useEffect(() => {
  //   if (chain && chain.id != 5) {
  //     setWrongNetwork(true);
  //   } else {
  //     setWrongNetwork(false);
  //   }
  // }, [chain]);

  // const onClick = () => {
  //   switchNetwork(chains[0].id);
  // };

  // if (!wrongNetwork) return null;

  if (address) return;

  return (
    <p id="action-banner">
      <ConnectWallet accentColor="#0d52a7" />
    </p>
    // <p id="msg-banner">
    //   You are on the wrong network, <br /> Please{" "}
    //   <span onClick={onClick}>Switch to Goerli</span>.
    // </p>
  );
}
