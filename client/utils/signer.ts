import dotenv from "dotenv";
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

}

export default signerContext;