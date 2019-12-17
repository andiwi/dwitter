import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";

interface ILoginProps {
  onClick: { (event: React.MouseEvent): any };
}

export default function Login(props: ILoginProps) {
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
        <Grid container justify="center">
          <Grid item xs={3}></Grid>
        </Grid>

        <Typography variant="h2">Ethereum Network: Ropsten</Typography>
        <Typography variant="body1" paragraph={true}>
          Dwitter is currently only available on ropsten testnet. Please make
          sure that your wallet is connected to the ropsten testnet and not to
          the mainnet.
        </Typography>
      </Grid>
      <Grid item xs={12} md={8} container justify="center">
        <Grid item xs={12} container justify="center">
          <Button variant="contained" color="primary" onClick={props.onClick}>
            Connect Wallet
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
