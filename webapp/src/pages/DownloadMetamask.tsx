import React from "react";
import {
  Typography,
  Grid,
  makeStyles,
  createStyles,
  Theme
} from "@material-ui/core";
import DownloadMetamaskImg from "./download-metamask-dark.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      width: "100%",
      height: "auto"
    }
  })
);

export default function DownloadMetamask() {
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={12} md={8}>
        <Typography variant="h1" paragraph={true}>
          How to use dwitter
        </Typography>
        <Typography variant="h2">Connect your digital wallet</Typography>
        <Typography variant="body1" paragraph={true}>
          To use dwitter, you need a digital wallet. We support Metamask but
          others might work as well.
        </Typography>
        <Typography variant="h2">Ethereum Network: Ropsten</Typography>
        <Typography variant="body1" paragraph={true}>
          Dwitter is currently only available on ropsten testnet. Please make
          sure that your wallet is connected to the ropsten testnet and not to
          the mainnet.
        </Typography>
      </Grid>
      <Grid item xs={12} md={8} container justify="center">
        <Grid item xs={4} container justify="center">
          <a href="https://metamask.io/">
            <img
              src={DownloadMetamaskImg}
              alt="Download Metamask"
              className={classes.image}
            />
          </a>
        </Grid>
      </Grid>
    </Grid>
  );
}
