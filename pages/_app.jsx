import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import UserProvider from "@/context/userContext";
import Warning from "@/components/Warning";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  const desiredChainId = ChainId.Goerli;

  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <UserProvider>
        <Component {...pageProps} />
        <Warning />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: 14,
            },
          }}
        />
      </UserProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
