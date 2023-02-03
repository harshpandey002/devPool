import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

export default function useNotify() {
  const PK = process.env.NEXT_PUBLIC_PRIVATE_KEY; // channel private key
  const Pkey = `0x${PK}`;
  const signer = new ethers.Wallet(Pkey);
  //   const channel = "eip155:5:0x4C4cc0104b7E5895613a2914fACf910d2cb36221";

  const notify = async (address, payload) => {
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, // target
        identityType: 2, // direct payload
        notification: {
          title: `devPool`,
          body: `devPool`,
        },
        payload,
        recipients: `eip155:5:${address}`, // recipient address
        channel: `eip155:5:${address}`, // your channel address
        env: "staging",
      });

      // apiResponse?.status === 204, if sent successfully!
      console.log("API repsonse: ", apiResponse);
    } catch (err) {
      console.error("Error: ", err.response);
    }
  };

  return notify;
}
