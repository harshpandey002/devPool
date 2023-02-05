/* eslint-disable react-hooks/exhaustive-deps */
import { CONTRACT_ADDRESS, NOTIF_KEY } from "@/helpers/constants";
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
    getUser();
  }, [userUrl]);

  useEffect(() => {
    if (!address) return;
    getFeeds();
  }, [address]);

  const getFeeds = async () => {
    const notifs = await PushAPI.user.getFeeds({
      user: `eip155:5:${"0x89564b31B65D39855c2adAD63dF76d89114ACA92"}`,
      env: "staging",
      spam: true,
    });
    setNotifications(notifs.filter((n) => n.notification.body === NOTIF_KEY));
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
