import React, { useState } from "react";
import Constraints from "./Constraints";
import {
  makeStyles,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  NativeSelect,
  Grid,
  Button,
} from "@material-ui/core";

import "bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(1),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    minWidth: 100,
    marginRight: theme.spacing(1),
  },
  button: { marginTop: theme.spacing(1), marginRight: theme.spacing(1) },
}));

const ConstraintForm = ({
  mods,
  tentativeConstraints,
  setTentativeConstraints,
  actualTimet,
}) => {
  const classes = useStyles();
  const [type, setType] = useState(0);
  //dunno why by default it is undefined
  const [modCod, setModCod] = useState(mods[0].moduleCode);
  const [mod, setMod] = useState(mods[0]);
  //Change default for this.
  const [time, setTime] = useState(Constraints[0].defaultTime);
  const defaultMod = mods[0].moduleCode;

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="button">Select your constraints</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="label">{Constraints[type].type}</InputLabel>
            <NativeSelect
              labedId="label"
              native
              onChange={handleConstraintTypeChange(setType, setTime)}
            >
              {Constraints.map(ConstraintDisplay)}
            </NativeSelect>
          </FormControl>
          {Constraints[type].needToSpecifyMod && (
            <FormControl className={classes.formControl}>
              <InputLabel> Module </InputLabel>
              <NativeSelect
                onChange={handleModChange(
                  setModCod,
                  setMod,
                  mods,
                  modCod,
                  type,
                  setTime
                )}
              >
                {mods.map(ModDisplay)}
              </NativeSelect>
            </FormControl>
          )}
          {actualTimet.length !== 0 &&
            Constraints[type].optionCode(
              setTime,
              time,
              actualTimet.filter((x) => x.moduleCode === modCod)[0]
            )}
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.button}
            variant="contained"
            onClick={handleSubmit(
              setTentativeConstraints,
              tentativeConstraints
            )(type, mod, time, defaultMod)}
          >
            Add Constraint
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

const handleModChange =
  (setModCod, setMod, mods, modCod, type, setTime) => (event) => {
    console.log(event.target.value);
    setModCod(event.target.value);
    setMod(mods.filter((y) => y.moduleCode === event.target.value)[0]);
    setTime(Constraints[type].defaultTime);
  };

const handleSubmit =
  (setTentativeConstraints, tentativeConstraints) =>
  (type, mod, time, defaultMod) =>
  (event) => {
    event.preventDefault();
    const check = Constraints[type].checkValid(time, tentativeConstraints);
    if (check.valid) {
      setTentativeConstraints([
        ...tentativeConstraints,
        {
          id: tentativeConstraints.length + 1,
          type: type,
          mod: Constraints[type].needToSpecifyMod
            ? typeof mod === "undefined"
              ? defaultMod
              : mod
            : null,
          time: time,
        },
      ]);
    } else {
      window.alert(check.message);
    }
  };

const handleConstraintTypeChange = (setType, setTime) => (event) => {
  const index = Constraints.findIndex((x) => x.type === event.target.value);
  setType(index);
  setTime(Constraints[index].defaultTime);
};

const ModDisplay = (mod) => {
  return (
    <option value={mod.moduleCode} key={mod.moduleCode}>
      {mod.moduleCode}
    </option>
  );
};

const ConstraintDisplay = (constraint) => {
  const type = constraint.type;
  console.log("constraint is", constraint);
  return (
    <option value={constraint.type} key={constraint.type}>
      {type}
    </option>
  );
};

export default ConstraintForm;
