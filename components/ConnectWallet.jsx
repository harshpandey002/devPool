/* eslint-disable @next/next/no-img-element */
import useIsMounted from "hooks/useIsMounted";
import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";

export default function ConnectWallet() {
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const mounted = useIsMounted();

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const connector = connectors[0];

  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (chain && chain.id != 5) {
      setWrongNetwork(true);
    } else {
      setWrongNetwork(false);
    }
  }, [chain]);

  const handleWarningClick = () => {
    switchNetwork(chains[0].id);
  };

  if (!mounted) return null;

  return (
    <>
      {wrongNetwork && <WrongNetwork onClick={handleWarningClick} />}
      {isConnected ? (
        <div>
          <button suppressHydrationWarning onClick={disconnect}>
            Disconnect
          </button>
          <p>{address}</p>
        </div>
      ) : (
        <div>
          <button
            suppressHydrationWarning
            disabled={!connector.ready}
            onClick={() => {
              connect({ connector });
            }}
          >
            {connector.name}
          </button>
        </div>
      )}
    </>
  );
}

function WrongNetwork({ onClick }) {
  return (
    <p id="msg-banner">
      You are on the wrong network, <br /> Please{" "}
      <span onClick={onClick}>Switch to Goerli</span> instead.
    </p>
  );
}
