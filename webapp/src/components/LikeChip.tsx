import React from "react";
import { Chip } from "@material-ui/core";
import LikeButton from "./LikeButton";

interface LikeChipProps {
  dweetId: number;
  dweetLikes: number;
  onClick: { (dweetId: number): any };
}
export default function LikeChip(props: LikeChipProps) {
  return (
    <Chip
      icon={<LikeButton dweetId={props.dweetId} onClick={props.onClick} />}
      label={props.dweetLikes}
      variant="outlined"
    />
  );
}
