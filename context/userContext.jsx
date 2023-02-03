/* eslint-disable react-hooks/exhaustive-deps */
import { CONTRACT_ADDRESS } from "@/helpers/constants";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { createContext, useContext, useEffect, useState } from "react";
import * as PushAPI from "@pushprotocol/restapi";

export const userContext = createContext({});

export const useUserContext = () => useContext(userContext);

function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [notifications, setNotifications] = useState([]);

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

  useEffect(() => {
    if (!address) return;
    getFeeds();
  }, [address]);

  const getFeeds = async () => {
    const notifs = await PushAPI.user.getFeeds({
      user: `eip155:5:${address}`, // user address in CAIP
      env: "staging",
      spam: true,
    });
    setNotifications(notifs.filter((n) => n.notification.body === "devPool"));
  };

  async function getUser() {
    const res = await fetch(userUrl);
    const data = await res.json();

    setUser(data);
  }

  const contextValue = {
    user,
    notifications,
  };

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
}

export default UserProvider;
