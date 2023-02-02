import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const desiredChainId = ChainId.Goerli;

  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <Component {...pageProps} />
      {/* <NetworkWarning /> */}
    </ThirdwebProvider>
  );
}

export default MyApp;
