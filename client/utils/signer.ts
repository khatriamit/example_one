import dotenv from "dotenv";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { JsonRpcProvider } from "@mysten/sui.js/src/providers/json-rpc-provider";
import { RawSigner } from "@mysten/sui.js/src/signers/raw-signer";
import { testnetConnection } from "@mysten/sui.js/src/rpc/connection";
dotenv.config()

const signerContext = () => {
  const secret_key = process.env.SECRET_KEY as string
  console.log(secret_key);

  const keyPair = Ed25519Keypair.fromSecretKey(Buffer.from(secret_key, "base64").slice(1))
  console.log(testnetConnection);

  const provider = new JsonRpcProvider(testnetConnection)
  const address = `${keyPair.getPublicKey().toSuiAddress()}`;
  const signer = new RawSigner(keyPair, provider)
  return { address, signer, provider };
}

export default signerContext;