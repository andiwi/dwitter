import Dweets from "../contracts/Dweets.json";
import { ethers } from "ethers";
import { Contract, Signer } from "ethers/ethers";
import { Provider } from "ethers/providers";
import IDweet from "../interfaces/IDweet.js";

export function getDweetsContractAddress(chainId: number) {
  if (chainId === 3) {
    //ropsten
    return "0xB22c4D2ddCF14f8F85fA3e8EBAd21407bc01Defa";
  }

  if (chainId === 5777) {
    //unknown or localhost
    return "0xd81F01f3b78794F3B62A74632b9B67b5af681116";
  }

  return null;
}

export async function getDweetsContractInstance(
  provider: Provider,
  signer?: Signer
) {
  //instantiate smart contract
  const abi = Dweets.abi;
  const network = await provider.getNetwork();
  const dweetsAddress = getDweetsContractAddress(network.chainId);
  if (dweetsAddress === null) {
    console.log("Unsupported network");
    return null;
  }

  let dweetsContract = new ethers.Contract(dweetsAddress, abi, provider);
  if (signer !== undefined) {
    dweetsContract = dweetsContract.connect(signer);
  }

  return dweetsContract;
}

export async function loadDweets(dweetsContract: Contract) {
  let dweetsCount = await dweetsContract.dweetsCount();
  dweetsCount = dweetsCount.toNumber();

  let dweets = [];
  for (let i: number = dweetsCount - 1; i >= 0; i--) {
    const dweet = await loadDweet(dweetsContract, i);
    dweets.push(dweet);
  }

  return dweets;
}

export async function loadDweet(dweetsContract: Contract, dweetId: number) {
  const res = await dweetsContract.dweets(dweetId);
  const dweet: IDweet = {
    id: res.id.toNumber(),
    message: res.message,
    author: res.author,
    likes: res.likes.toNumber()
  };

  return dweet;
}

export async function likeDweet(dweetsContract: Contract, dweetId: number) {
  const tx = await dweetsContract.like(dweetId);
  await tx.wait();
}
