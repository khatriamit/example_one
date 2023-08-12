import dotenv from "dotenv";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { SuiClient } from "@mysten/sui.js/client";
dotenv.config()

const signerContext = () => {
  const secret_key = process.env.SECRET_KEY as string
  const testRPC = process.env.TEST_RPC as string;
  const client = new SuiClient({ url: testRPC });

  const keyPair = Ed25519Keypair.fromSecretKey(Buffer.from(secret_key, "base64").slice(1))
  const address = `${keyPair.getPublicKey().toSuiAddress()}`;
  return { address, keyPair, client };
}

export default signerContext;