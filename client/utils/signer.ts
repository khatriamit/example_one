import dotenv from "dotenv";

import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { fromB64 } from '@mysten/sui.js/utils'
import { SuiClient } from "@mysten/sui.js/client";

dotenv.config()

const signerContext = () => {
  const secretKey = process.env.SECRET_KEY as string
  const provider = process.env.TEST_RPC as string
  
  const keyPair = Ed25519Keypair.fromSecretKey(fromB64(secretKey).slice(1));
  const address = `${keyPair.getPublicKey().toSuiAddress()}`;
  const client = new SuiClient({url:provider})
  
  return { address, keyPair, client };

}

export default signerContext;