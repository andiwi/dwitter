import React from "react";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

interface LikeButtonProps {
  dweetId: number;
  onClick: { (dweetId: number): any };
}

export default function LikeButton(props: LikeButtonProps) {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    props.onClick(props.dweetId);
  };

  return (
    <IconButton aria-label="like" onClick={handleClick}>
      <FavoriteIcon />
    </IconButton>
  );
}
