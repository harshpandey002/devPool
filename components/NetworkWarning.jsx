/* eslint-disable @next/next/no-img-element */
import useIsMounted from "hooks/useIsMounted";
import { useEffect, useState } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";

export default function NetworkWarning() {
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const mounted = useIsMounted();
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (chain && chain.id != 5) {
      setWrongNetwork(true);
    } else {
      setWrongNetwork(false);
    }
  }, [chain]);

  const onClick = () => {
    switchNetwork(chains[0].id);
  };

  if (!mounted) return null;
  if (!wrongNetwork) return null;

  return (
    <p id="msg-banner">
      You are on the wrong network, <br /> Please{" "}
      <span onClick={onClick}>Switch to Goerli</span>.
    </p>
  );
}
