import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import {
  FormControl,
  NativeSelect,
  InputBase,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

export default function Help() {
  const classes = useStyles();
  return (
    <FormControl className={classes.root}>
      <NativeSelect className={classes.root}>
        <InputLabel> Lol </InputLabel>
        <option> 1 </option>
        <MenuItem> 2 </MenuItem>
      </NativeSelect>
    </FormControl>
  );
}
