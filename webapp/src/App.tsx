import React, { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import { Signer } from "ethers/ethers";
import {
  AppBar,
  Container,
  Theme,
  Typography,
  Toolbar,
  createStyles,
  makeStyles
} from "@material-ui/core";
import Login from "./components/Login";
import DownloadMetamask from "./components/DownloadMetamask";
import { getDweetsContractInstance } from "./utils/DweetsContractUtils";
import { detectWeb3, getWeb3Provider } from "./utils/Web3Utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbarTitle: {
      flexGrow: 1
    }
  })
);

export default function App() {
  const classes = useStyles();

  const [web3Detected, setWeb3Detected] = useState<boolean>(false);
  const [web3Provider, setWeb3Provider] = useState();
  const [signer, setSigner] = useState<Signer>();
  const [account, setAccount] = useState<string>();
  const [dweetsContract, setDweetsContract] = useState<Contract>();

  const loadWeb3 = async () => {
    const web3Provider = await getWeb3Provider();
    if (web3Provider === null) {
      console.log("Unable to access web3 provider.");
      return;
    }
    setWeb3Provider(web3Provider);

    //set provider and signer
    const provider = new ethers.providers.Web3Provider(web3Provider);
    const signer = provider.getSigner();
    setSigner(signer);
    const account = await signer.getAddress();
    setAccount(account);

    //instantiate smart contract
    const dweetsContract = await getDweetsContractInstance(signer);
    if (dweetsContract === null) {
      console.log("Unable to instantiate dweets contract.");
      return;
    }
    setDweetsContract(dweetsContract);
  };

  const handleConnectMetamask = (event: React.MouseEvent) => {
    event.preventDefault();
    loadWeb3();
  };

  //detect if web3 is available or not
  useEffect(() => {
    setWeb3Detected(detectWeb3());
  }, []);

  //render elements
  let appContent;
  if (!web3Detected) {
    appContent = <DownloadMetamask />;
  } else {
    //web3 detected
    if (account === undefined) {
      //show login info
      appContent = <Login onClick={handleConnectMetamask} />;
    } else {
      //metamask connected
      appContent = <Typography>Your address: {account}</Typography>;
    }
  }

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.appbarTitle}>
            dwitter - a decentralised message board.
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>{appContent}</Container>
    </React.Fragment>
  );
}
