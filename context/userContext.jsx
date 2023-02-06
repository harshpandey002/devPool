/* eslint-disable react-hooks/exhaustive-deps */
import { CONTRACT_ADDRESS, NOTIF_KEY } from "@/helpers/constants";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { createContext, useContext, useEffect, useState } from "react";
import * as PushAPI from "@pushprotocol/restapi";
import { toast } from "react-hot-toast";

export const userContext = createContext({});

export const useUserContext = () => useContext(userContext);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
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
    if (!address) {
      setUser(null);
      return;
    }
    getFeeds();
  }, [address]);

  const getFeeds = async () => {
    const notifs = await PushAPI.user.getFeeds({
      user: "eip155:5:0x83CA1961e5b150D65c7C9AFD1a9D72bAa5bDcbd8",
      env: "staging",
      spam: true,
    });
    // setNotifications(notifs.filter((n) => n.notification.body === NOTIF_KEY));
    setNotifications(notifs);
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
