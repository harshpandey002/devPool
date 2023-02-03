import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import UserProvider from "@/context/userContext";
import Warning from "@/components/Warning";

function MyApp({ Component, pageProps }) {
  const desiredChainId = ChainId.Goerli;

  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <UserProvider>
        <Component {...pageProps} />
        <Warning />
      </UserProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
