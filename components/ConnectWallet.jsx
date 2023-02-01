/* eslint-disable @next/next/no-img-element */
import useIsMounted from "hooks/useIsMounted";
import { useEffect } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const mounted = useIsMounted();

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const connector = connectors[0];

  console.log(!connector.ready);

  useEffect(() => {
    console.log(connector);
  }, [connector]);

  if (!mounted) return null;

  return (
    <>
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
