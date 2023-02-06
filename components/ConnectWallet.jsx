/* eslint-disable @next/next/no-img-element */
import { useMetamask } from "@thirdweb-dev/react";
import { useRouter } from "next/router";

export default function ConnectWallet() {
  const connectWithMetamask = useMetamask();
  const router = useRouter();

  const onConnect = async () => {
    try {
      await connectWithMetamask();
      if (router.asPath === "/") {
        router.push("/developers");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return <button onClick={onConnect}>Connect Metamask</button>;
}
