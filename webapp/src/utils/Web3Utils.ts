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
