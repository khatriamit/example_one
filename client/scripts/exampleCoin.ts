
import dotenv from "dotenv";
import { TransactionBlock } from "@mysten/sui.js/transactions"
import signerContext from "../utils/signer";

dotenv.config();

const packageId = "0x2f00cc5f4298ab3cfcfdf3da58a9d61b677aa8e3443ffd133bba1802770cd25b"
const exampleCoinFaucetId = "0xa821b01deee0f0d6212c1f0da93e2432f358f7ee1b67ce19e03f28dfacab4e4a";


async function faucetMint() {
  const { address, keyPair, client } = signerContext();
  const tx = new TransactionBlock();
  let faucet = tx.object(exampleCoinFaucetId);
  const coin = tx.moveCall({
    target: `${packageId}::example_coin::faucet_mint`,
    arguments: [faucet],
    typeArguments: []
  });
  tx.transferObjects([coin], tx.pure(address));
  tx.setGasBudget(100000000);
  const result = await client.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    requestType: "WaitForLocalExecution",
    signer: keyPair,
    options: {
      showEffects: true
    }
  })
  console.log(result);

}

async function faucetMintBalance() {
  const { address, keyPair, client } = signerContext();
  const tx = new TransactionBlock();
  let faucet = tx.object(exampleCoinFaucetId);
  const balance = tx.moveCall({
    target: `${packageId}::example_coin::faucet_mint_balance`,
    arguments: [faucet],
    typeArguments: []
  });
  tx.transferObjects([balance], tx.pure(address));
  tx.setGasBudget(100000000);
  const result = await client.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    requestType: "WaitForLocalExecution",
    signer: keyPair,
    options: {
      showEffects: true
    }
  })
  console.log(result);

}

faucetMintBalance()
// faucetMint()