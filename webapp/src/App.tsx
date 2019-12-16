import React from "react";
import {
  AppBar,
  Container,
  Theme,
  Typography,
  Toolbar,
  createStyles,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbarTitle: {
      flexGrow: 1
    }
  })
);

export default function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.appbarTitle}>
            dwitter - a decentralised message board.
          </Typography>
        </Toolbar>
      </AppBar>
      <Container></Container>
    </React.Fragment>
  );
}
