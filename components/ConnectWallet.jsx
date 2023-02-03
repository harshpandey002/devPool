/* eslint-disable @next/next/no-img-element */
import { useMetamask } from "@thirdweb-dev/react";

export default function ConnectWallet() {
  const connectWithMetamask = useMetamask();

  const onConnect = () => {
    connectWithMetamask();
  };

  return <button onClick={onConnect}>Metamask</button>;
}
