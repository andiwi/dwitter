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
import { getDweetsContractInstance } from "./utils/DweetsContractUtils";
import { detectWeb3, getWeb3Provider } from "./utils/Web3Utils";
import WrongNetwork from "./pages/WrongNetwork";
import DweetsFeed from "./pages/DweetsFeed";
import ConnectWalletPopup from "./components/ConnectWalletPopup";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbarTitle: {
      flexGrow: 1
    }
  })
);

export default function App() {
  const classes = useStyles();

  const [web3Provider, setWeb3Provider] = useState();
  const [provider, setProvider] = useState(
    ethers.getDefaultProvider("ropsten")
  );
  const [signer, setSigner] = useState<Signer>();
  const [account, setAccount] = useState<string>();
  const [dweetsContract, setDweetsContract] = useState<Contract>();

  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  const loadWeb3 = async () => {
    const web3Provider = await getWeb3Provider();
    if (web3Provider === null) {
      console.log("Unable to access web3 provider.");
      return;
    }
    setWeb3Provider(web3Provider);

    //set provider and signer
    const provider = new ethers.providers.Web3Provider(web3Provider);
    setProvider(provider);
    const signer = provider.getSigner();
    setSigner(signer);
    const account = await signer.getAddress();
    setAccount(account);
  };

  const handleConnectMetamask = (event: React.MouseEvent) => {
    event.preventDefault();
    if (detectWeb3()) {
      loadWeb3();
      return;
    }

    //open download metamask popup
    setPopupOpen(true);
  };

  //listen for address and network changes
  useEffect(() => {
    if (web3Provider === undefined) {
      return;
    }

    web3Provider.on("networkChanged", (networkId: string) => {
      const provider = new ethers.providers.Web3Provider(web3Provider);
      const signer = provider.getSigner();
      setProvider(provider);
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

  //instantiate new smart contract on provider change
  useEffect(() => {
    if (provider === undefined) {
      return;
    }

    //instantiate smart contract
    getDweetsContractInstance(provider, signer).then(contract => {
      if (contract === null) {
        console.log("Unable to instantiate dweets contract.");
        setDweetsContract(undefined);
        return;
      }

      setDweetsContract(contract);
    });
  }, [provider, signer]);

  //render elements
  let appBarRightElements;
  let appContent;

  if (dweetsContract !== undefined) {
    appContent = (
      <DweetsFeed
        dweetsContract={dweetsContract}
        openConnectWalletPopup={() => {
          setPopupOpen(true);
        }}
      />
    );
  } else {
    //might be on wrong network
    appContent = <WrongNetwork />;
  }

  if (account !== undefined) {
    appBarRightElements = <Typography>Your address: {account}</Typography>;
  } else {
    appBarRightElements = (
      <Button color="inherit" onClick={handleConnectMetamask}>
        Connect Wallet
      </Button>
    );
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
      <ConnectWalletPopup
        open={popupOpen}
        handleClose={() => {
          setPopupOpen(false);
        }}
        handleConnect={loadWeb3}
      />
    </ThemeProvider>
  );
}
