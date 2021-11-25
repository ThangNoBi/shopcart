import React from "react";
import { Skeleton, Stack } from "@mui/material";

SkeletonCategory.propTypes = {};

function SkeletonCategory(props) {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton />
      <Skeleton />
    </Stack>
  );
}

export default SkeletonCategory;
