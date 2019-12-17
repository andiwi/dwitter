declare global {
  interface Window {
    ethereum?: any;
    web3?: any;
  }
}

export function detectWeb3() {
  if (window.ethereum || window.web3) {
    return true;
  }
  return false;
}

export async function getWeb3Provider() {
  if (window.ethereum) {
    //modern dapp browsers
    const web3Provider = window.ethereum;
    try {
      //Request account access
      await window.ethereum.enable();
      return web3Provider;
    } catch (error) {
      //User denied account access...
      console.error("User denied account access to metamask");
      return null;
    }
  }

  if (window.web3) {
    //legacy dapp browsers
    return window.web3;
  }

  //non-dapp browser
  return null;
}
