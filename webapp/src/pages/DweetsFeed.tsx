import React from "react";
import { Contract } from "ethers";
import { Grid } from "@material-ui/core";
import DweetPostCard from "../components/DweetPostCard";
import DweetCardsList from "../components/DweetCardsList";

interface DweetsFeedProps {
  dweetsContract: Contract;
}

export default function DweetsFeed(props: DweetsFeedProps) {
  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={12} md={8}>
        <DweetPostCard dweetsContract={props.dweetsContract} />
        <DweetCardsList dweetsContract={props.dweetsContract} />
      </Grid>
    </Grid>
  );
}
