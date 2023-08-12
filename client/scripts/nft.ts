import dotenv from "dotenv";
import { TransactionBlock } from "@mysten/sui.js/transactions"
import signerContext from "../utils/signer";

dotenv.config();

const packageId = process.env.PACKAGE_ID as string

async function mint() {
  const txb = new TransactionBlock();

  const color = txb.pure("Black", "string");
  const number = txb.pure("40", "u32");

  const { address, keyPair, client } = signerContext();

  const nft = txb.moveCall({
    target: `${packageId}::nft::mint`,
    arguments: [txb.pure("white", "string"), txb.pure("45", "u32")]
  })

  txb.transferObjects([nft], txb.pure(address))
  const res = await client.signAndExecuteTransactionBlock({
    transactionBlock: txb,
    signer: keyPair,
    requestType: "WaitForLocalExecution",
    options: {
      showEffects: true
    }
  })
  console.log(res);
}


async function mintAndTransfer() {
  const txb = new TransactionBlock();

  const color = txb.pure("Black", "string");
  const number = txb.pure("40", "u32");

  const { address, keyPair, client } = signerContext();

  txb.moveCall({
    target: `${packageId}::nft::mint_and_transfer`,
    arguments: [txb.pure("white", "string"), txb.pure("45", "u32")]
  })

  const res = client.signAndExecuteTransactionBlock({
    transactionBlock: txb,
    signer: keyPair,
    requestType: "WaitForLocalExecution",
    options: {
      showEffects: true
    }
  })
  console.log(JSON.stringify(res));
}


const main = async () => {
  await mint();
  // await mintAndTransfer();
};

main();

