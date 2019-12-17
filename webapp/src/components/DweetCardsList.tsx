import React, { useEffect, useState } from "react";
import { Contract } from "ethers/ethers";
import {
  CardContent,
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardHeader,
  CardActions
} from "@material-ui/core";
import IDweet from "../interfaces/IDweet";
import { loadDweets, likeDweet } from "../utils/DweetsContractUtils";
import LikeChip from "./LikeChip";

interface DweetCardsListProps {
  dweetsContract: Contract;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: "100%",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
);

export default function DweetCardsList(props: DweetCardsListProps) {
  const classes = useStyles();
  const [dweets, setDweets] = useState<Array<IDweet>>([]);

  //load dweets when contract changes
  useEffect(() => {
    if (props.dweetsContract === undefined) {
      return;
    }

    async function load() {
      const dweets = await loadDweets(props.dweetsContract);
      setDweets(dweets);
    }
    load();
  }, [props.dweetsContract]);

  const handleLikeClick = async (dweetId: number) => {
    if (dweets === undefined) {
      return;
    }

    await likeDweet(props.dweetsContract, dweetId);
  };

  if (dweets === undefined) {
    return <div>loading dweets...</div>;
  }

  if (dweets.length === 0) {
    return <div>there are no dweets.</div>;
  }

  //generate dweet card for each dweet
  const dweetCards = dweets.map((item, key) => {
    const title: string = "From: " + item.author;

    return (
      <Card key={key} className={classes.card}>
        <CardHeader title={title} />
        <CardContent>{item.message}</CardContent>
        <CardActions disableSpacing>
          <LikeChip
            dweetId={item.id}
            dweetLikes={item.likes}
            onClick={handleLikeClick}
          />
        </CardActions>
      </Card>
    );
  });

  return <React.Fragment>{dweetCards}</React.Fragment>;
}
