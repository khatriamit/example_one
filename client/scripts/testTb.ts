
import { TransactionBlock } from "@mysten/sui.js/transactions";
// import signerContext from "./utils/signer";
// import { SuiClient } from "@mysten/sui.js/src/client";
import { SuiClient } from "@mysten/sui.js/client";
// import { testnetConnection } from "@mysten/sui.js/src/rpc/connection";
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519'
import { fromB64 } from '@mysten/sui.js/utils'
import dotenv from "dotenv";


dotenv.config();
const txb = new TransactionBlock();
const packageId = process.env.PACKAGE_ID as string

console.log(packageId);

// const { address, signer, provider } = signerContext();

let color = txb.pure("Red", "string");
let weight = txb.pure("50", "u32");

async function demo() {
  const client = new SuiClient({ url: "https://fullnode.testnet.sui.io:443/" });
  const keyPair = Ed25519Keypair.fromSecretKey(fromB64("AA4yexHtl5gQbuShS54Gj/CumP5G5f8sraVAOXVsyENN").slice(1))

  const movRes = txb.moveCall({
    target: `${packageId}::nft::mint_and_transfer`,
    arguments: [color, weight],
    typeArguments: [],
  });
  txb.setGasBudget(100000000);
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

demo()