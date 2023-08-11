import dotenv from "dotenv";
import { TransactionBlock } from "@mysten/sui.js"
import { RawSigner } from "@mysten/sui.js";
import signerContext from "./utils/signer";
dotenv.config()

const package_id = process.env.PACKAGE_ID  as string;

const mint_with_exact_payment = async (address: string, signer: RawSigner) => {
  const exactPaymentInMIST = 100000;
  const tx = new TransactionBlock();

  tx.setSender(address);
  console.log(package_id);
  
  const fee = tx.splitCoins(tx.gas, [tx.pure(exactPaymentInMIST)]);
  const nft = tx.moveCall({
    target: `${package_id}::nft::costly_mint`,
    arguments: [fee]
  });
  tx.transferObjects([nft], tx.pure(address));

  const response = signer.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    requestType: "WaitForLocalExecution",
    options: {
      showBalanceChanges: true,
      showEffects: true
    }
  });
  return response;
}

const mint = async (
  color: string,
  weight: number,
  address: string,
  signer: RawSigner
) => {
  const tx = new TransactionBlock();

  tx.setSender(address);
  
  const nft = tx.moveCall({
    target: `${package_id}::nft::mint`,
    arguments: [tx.pure(color, "string"), tx.pure(weight, "u32")],
    typeArguments: [],
  });

  console.log(nft);

  tx.transferObjects([nft], tx.pure(address));

  const response = await signer.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    requestType: "WaitForLocalExecution",
    options: {
      showEffects: false,
    },
  });

  return response;
};

const main = async () => {
  const { address, signer, provider } = signerContext();
  const color = "amit";
  const weight = 28;

  const result = await mint(color, weight, address, signer);
  console.log(JSON.stringify(result));
};

main();

