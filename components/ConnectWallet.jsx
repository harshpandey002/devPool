/* eslint-disable @next/next/no-img-element */
import useIsMounted from "hooks/useIsMounted";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const mounted = useIsMounted();

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const connector = connectors[0];

  if (!mounted) return null;

  return isConnected ? (
    <>
      <p>{address}</p>
      <button suppressHydrationWarning onClick={disconnect}>
        Disconnect
      </button>
    </>
  ) : (
    <button
      suppressHydrationWarning
      disabled={!connector.ready}
      onClick={() => connect({ connector })}
    >
      {connector.name}
    </button>
  );
}
