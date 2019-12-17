import React, { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import { Signer } from "ethers/ethers";
import {
  AppBar,
  Button,
  Container,
  Theme,
  Typography,
  Toolbar,
  createStyles,
  makeStyles,
  ThemeProvider,
  CssBaseline
} from "@material-ui/core";

import theme from "./theme";
import Login from "./pages/Login";
import DownloadMetamask from "./pages/DownloadMetamask";
import { getDweetsContractInstance } from "./utils/DweetsContractUtils";
import { detectWeb3, getWeb3Provider } from "./utils/Web3Utils";
import WrongNetwork from "./pages/WrongNetwork";
import DweetsFeed from "./pages/DweetsFeed";

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

  //listen for address and network changes
  useEffect(() => {
    if (web3Provider === undefined) {
      return;
    }

    web3Provider.on("networkChanged", (networkId: string) => {
      const provider = new ethers.providers.Web3Provider(web3Provider);
      const signer = provider.getSigner();
      setSigner(signer);
    });

    web3Provider.on("accountsChanged", (accounts: Array<string>) => {
      setAccount(accounts[0]);
    });

    return () => {
      web3Provider.removeListener("networkChanged");
      web3Provider.removeListener("accountsChanged");
    };
  }, [web3Provider]);

  //instantiate new smart contract on signer change
  useEffect(() => {
    if (signer === undefined || signer.provider === undefined) {
      return;
    }

    //instantiate smart contract
    getDweetsContractInstance(signer).then(contract => {
      if (contract === null) {
        setDweetsContract(undefined);
        return;
      }

      setDweetsContract(contract);
    });
  }, [signer]);

  //render elements
  let appBarRightElements;
  let appContent;

  if (!web3Detected) {
    appContent = <DownloadMetamask />;
  } else {
    //web3 detected
    if (account === undefined) {
      //show login info
      appContent = <Login onClick={handleConnectMetamask} />;

      appBarRightElements = (
        <Button color="inherit" onClick={handleConnectMetamask}>
          Connect Wallet
        </Button>
      );
    } else if (dweetsContract === undefined) {
      //metamask connected but wrong network
      appContent = <WrongNetwork />;
    } else {
      //metamask connected
      appContent = <DweetsFeed dweetsContract={dweetsContract} />;
      appBarRightElements = <Typography>Your address: {account}</Typography>;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.appbarTitle}>
            dwitter - a decentralised message board.
          </Typography>
          {appBarRightElements}
        </Toolbar>
      </AppBar>
      <Container>{appContent}</Container>
    </ThemeProvider>
  );
}
