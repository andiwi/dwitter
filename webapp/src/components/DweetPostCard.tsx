import React, { useState } from "react";
import {
  Theme,
  createStyles,
  Card,
  CardContent,
  TextField,
  CardActions,
  Button,
  makeStyles
} from "@material-ui/core";
import { Contract } from "ethers/ethers";

interface DweetPostCardProps {
  dweetsContract: Contract;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: "100%",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    textField: {
      width: "100%"
    }
  })
);

export default function DweetPostCard(props: DweetPostCardProps) {
  const classes = useStyles();
  const [message, setMessage] = useState<string>();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (message !== undefined && message !== "") {
      //post dweet
      const tx = await props.dweetsContract.postDweet(message);
      await tx.wait();

      //reset message
      setMessage("");
    }
  };

  return (
    <Card className={classes.card}>
      <form noValidate autoComplete="off">
        <CardContent>
          <TextField
            id="outlined-multiline-flexible"
            label="What's happening?"
            multiline
            rowsMax="4"
            value={message}
            onChange={e => {
              setMessage(e.target.value);
            }}
            margin="normal"
            className={classes.textField}
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Dweet
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
