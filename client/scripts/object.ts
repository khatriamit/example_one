import dotenv from "dotenv";
import { TransactionBlock } from "@mysten/sui.js/transactions"
import signerContext from "../utils/signer";
dotenv.config();

const packageId = process.env.PACKAGE_ID as string

async function createAndTransfer() {
    const { address, keyPair, client } = signerContext();
    const tx = new TransactionBlock()

    tx.moveCall({
        target:`${packageId}::object::create_and_transfer`,
        arguments:[tx.pure(address)]
    });

    const result = await client.signAndExecuteTransactionBlock({
        transactionBlock:tx,
        requestType:"WaitForLocalExecution",
        signer:keyPair,
        options:{
            showEffects:true
        }
    });
    console.log(result);
}

createAndTransfer()