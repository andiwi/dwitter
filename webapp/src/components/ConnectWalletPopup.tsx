import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import { detectWeb3 } from "../utils/Web3Utils";

interface ConnectWalletPopupProps {
  open: boolean;
  handleClose(): void;
  handleConnect(): void;
}

export default function ConnectWalletPopup(props: ConnectWalletPopupProps) {
  const handleConnect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (detectWeb3()) {
      props.handleConnect();
    } else {
      window.open("https://metamask.io/");
    }

    props.handleClose();
  };

  let dialogTitleText;
  let dialogText;
  let buttonText;

  if (detectWeb3()) {
    //connect dialog
    dialogTitleText = "Please connect your wallet.";
    dialogText =
      "Dwitter is a decentralised message board. The dApp is running on the ethereum blockchain. Please connect your ethereum wallet to interact with dwitter.";
    buttonText = "Connect Wallet";
  } else {
    //download metamask dialog
    dialogTitleText = "Please download an ethereum wallet.";
    dialogText =
      "Dwitter is a decentralised message board. The dApp is running on the ethereum blockchain. Please download an ethereum wallet like metamask to interact with dwitter.";
    buttonText = "Download Metamask";
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitleText}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConnect} color="primary" autoFocus>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
