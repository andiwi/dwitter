import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function WrongNetwork() {
  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={12} md={8}>
        <Typography variant="h1" paragraph={true}>
          Wrong ethereum network
        </Typography>
        <Typography variant="h2">
          Please switch to Ethereum Network: Ropsten
        </Typography>
        <Typography variant="body1" paragraph={true}>
          Dwitter is currently only available on ropsten testnet. Please make
          sure that your wallet is connected to the ropsten testnet and not to
          the mainnet.
        </Typography>
      </Grid>
    </Grid>
  );
}
