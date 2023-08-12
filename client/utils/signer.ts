import dotenv from "dotenv";
<<<<<<< HEAD
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
=======
// import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
// import { JsonRpcProvider } from "@mysten/sui.js/src/providers/json-rpc-provider";
// import { RawSigner } from "@mysten/sui.js/src/signers/raw-signer";
// import { testnetConnection } from "@mysten/sui.js/src/rpc/connection";
import { Ed25519Keypair } from "@mysten/sui.js";
import { JsonRpcProvider } from "@mysten/sui.js";
import { RawSigner, fromB64 } from "@mysten/sui.js";
import { testnetConnection } from "@mysten/sui.js";
dotenv.config()

const signerContext = () => {
  // const secret_key = process.env.SECRET_KEY as string
  // console.log(secret_key);
  // const keyPair = Ed25519Keypair.fromSecretKey(Buffer.from(secret_key, "base64").slice(1))
  // console.log(testnetConnection);
  // const provider = new JsonRpcProvider(testnetConnection);
  // const address = `${keyPair.getPublicKey().toSuiAddress()}`;
  // const signer = new RawSigner(keyPair, provider)
  // return { address, signer, provider };

  const b64PrivateKey = process.env.SECRET_KEY as string;
  const privkey: number[] = Array.from(fromB64(b64PrivateKey));
  privkey.shift(); // this will be needed to form a signature
  const privateKey = Uint8Array.from(privkey);
  const keypair = Ed25519Keypair.fromSecretKey(privateKey);

  const address = `${keypair.getPublicKey().toSuiAddress()}`;
  const provider = new JsonRpcProvider(testnetConnection);
  const signer = new RawSigner(keypair, provider);
  return { address, signer, provider };

>>>>>>> 293edbe363f68b8b034b3af3c33a1cb37585a8ef
}

export default signerContext;