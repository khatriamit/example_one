
import dotenv from "dotenv";
import { TransactionBlock } from "@mysten/sui.js/transactions"
import signerContext from "../utils/signer";

dotenv.config();

const packageId = process.env.PACKAGE_ID as string


async function createProfile() {
  const { address, keyPair, client } = signerContext();
  const tx = new TransactionBlock();
  let name = tx.pure("amit", "string");
  let url = tx.pure("amit.com/", "string");
  tx.moveCall({
    target: `${packageId}::profile::create_profile`,
    arguments: [name, url],
    typeArguments: []
  });

  const result = await client.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    requestType: "WaitForLocalExecution",
    signer:keyPair,
    options: {
      showEffects: true
    }
  })
  console.log(result);

}
createProfile()