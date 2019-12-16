import React, { useState, useEffect } from "react";
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
import { detectWeb3 } from "./utils/Web3Utils";

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
  const [account, setAccount] = useState<string>();

  const handleConnectMetamask = (event: React.MouseEvent) => {
    event.preventDefault();
    //TODO loadWeb3();
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
