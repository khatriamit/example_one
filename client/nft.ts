import { TransactionBlock } from "@mysten/sui.js/transactions"
import { RawSigner } from "@mysten/sui.js/src/signers/raw-signer";
import signerContext from "./utils/signer";



const mintTs = async () => {
  const { address, signer, provider } = signerContext();
  const tx = new TransactionBlock();

  let color = tx.pure("Red", "string");
  let weight = tx.pure("50", "u32");
  const res = tx.moveCall({
    target: '0xfa54ab370242c021c23752470f3396116d3858cb2c1c393f617678d55af35b1e::nft::mint',
    arguments: [color, weight],
    typeArguments: [],
  });

  const result = signer.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    requestType: "WaitForLocalExecution",
    options: {
      showEffects: true
    }
  });
  console.log(result);
}

const mint_with_exact_payment = async (address: string, signer: RawSigner) => {
  const exactPaymentInMIST = 100000;
  const tx = new TransactionBlock();

  tx.setSender(address);

  const fee = tx.splitCoins(tx.gas, [tx.pure(exactPaymentInMIST)]);
  const nft = tx.moveCall({
    target: `0xfa54ab370242c021c23752470f3396116d3858cb2c1c393f617678d55af35b1e::nft::costly_mint`,
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
    target: `$0xfa54ab370242c021c23752470f3396116d3858cb2c1c393f617678d55af35b1e::nft::mint`,
    arguments: [tx.pure(color, "string"), tx.pure(weight, "u32")],
    typeArguments: [],
  });

  console.log(nft);

  tx.transferObjects([nft], tx.pure(address));

  const response = await signer.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    requestType: "WaitForLocalExecution",
    options: {
      showEffects: true,
    },
  });

  return response;
};

const main = async () => {
  const { address, signer, provider } = signerContext();
  let result;
  //call mint
  const color = "amit";
  const weight = 28;


  result = await mint(color, weight, address, signer);

  //   //call mint_and_change
  //   //   result = await mint_and_change(color, weight, address, signer);

  //   // mint with payment
  //   // result = await mint_with_exact_payment(address, signer);

  //   // call bad example
  //   // result = await bad_call(color, weight, address, signer);

  //   // call mass mint
  //   // result = await mass_mint_correct(address, signer);
  console.log(JSON.stringify(result));
};

main();

