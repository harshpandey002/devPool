/* eslint-disable react-hooks/exhaustive-deps */
import { CONTRACT_ADDRESS } from "@/helpers/constants";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { createContext, useContext, useEffect, useState } from "react";

export const userContext = createContext({});

export const useUserContext = () => useContext(userContext);

function UserProvider({ children }) {
  const [user, setUser] = useState();

  const { contract } = useContract(CONTRACT_ADDRESS);
  const address = useAddress();
  const { data: userUrl } = useContractRead(
    contract,
    "getUserByAddress",
    address
  );

  useEffect(() => {
    if (!userUrl) return;
    console.log(address);
    getUser();
  }, [userUrl]);

  async function getUser() {
    const res = await fetch(userUrl);
    const data = await res.json();

    setUser(data);
  }

  const contextValue = {
    user,
  };

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
}

export default UserProvider;
