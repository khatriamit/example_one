
import { TransactionBlock } from "@mysten/sui.js"
import signerContext from "./utils/signer";

const createProfile = async () => {
  const { address, signer, provider } = signerContext();
  const tx = new TransactionBlock();
  let name = tx.pure("amit", "string");
  let url = tx.pure("amit.com/", "string");
  const res = tx.moveCall({
    target: `0x42e6b25e4fe4c97e6ddc2301d18736319316054adc02bc9409d13d8ff485890b::profile::create_profile`,
    arguments: [name, url],
    typeArguments: []
  });

  const result = signer.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    requestType: "WaitForLocalExecution",
    options: {
      showEffects: true
    }
  })
  console.log(result);

}