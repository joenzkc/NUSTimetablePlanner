import React, { Fragment, useEffect, useState } from "react";
import Constraints from "./Constraints";
import {
  makeStyles,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  NativeSelect,
  withStyles,
  MenuItem,
} from "@material-ui/core";
// import axios from "axios";

import { Form, FormGroup, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";

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
    // <Paper className={classes.root}>
    //   <Typography variant="h6" display="block">
    //     Select your constraints
    //   </Typography>
    //   <Form
    //   // onSubmit={handleSubmit(setTentativeConstraints, tentativeConstraints)(
    //   //   type,
    //   //   mod,
    //   //   time,
    //   //   defaultMod
    //   // )}
    //   >
    //     <FormGroup>
    //       <div className="btn-group">
    //         <Dropdown>
    //           <DropdownButton
    //             title={Constraints[type].type}
    //             onSelect={handleConstraintTypeChange(setType, setTime)}
    //           >
    //             {Constraints.map(ConstraintDisplay)}
    //           </DropdownButton>
    //         </Dropdown>
    //         {Constraints[type].needToSpecifyMod && (
    //   <Dropdown>
    //     <DropdownButton
    //       title={modCod}
    //       onSelect={handleModChange(
    //         setModCod,
    //         setMod,
    //         mods,
    //         modCod,
    //         type,
    //         setTime
    //       )}
    //     >
    //       {mods.map(ModDisplay)}
    //     </DropdownButton>
    //   </Dropdown>
    //         )}
    //         {actualTimet.length !== 0 &&
    //           Constraints[type].optionCode(
    //             setTime,
    //             time,
    //             actualTimet.filter((x) => x.moduleCode === modCod)[0]
    //           )}
    //         <Button
    //           type="submit"
    //           onClick={handleSubmit(
    //             setTentativeConstraints,
    //             tentativeConstraints
    //           )(type, mod, time, defaultMod)}
    //         >
    //           Submit constraint
    //         </Button>
    //       </div>
    //     </FormGroup>
    //   </Form>
    // </Paper>

    <Paper className={classes.root}>
      <Typography variant="h6">Select your constraints</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id="label">{Constraints[type].type}</InputLabel>
        <NativeSelect
          labedId="label"
          native
          onSelect={handleConstraintTypeChange(setType, setTime)}
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
      <Button
        type="submit"
        onClick={handleSubmit(setTentativeConstraints, tentativeConstraints)(
          type,
          mod,
          time,
          defaultMod
        )}
      >
        Submit Constraint
      </Button>
    </Paper>
  );
};

const handleModChange =
  (setModCod, setMod, mods, modCod, type, setTime) => (input) => {
    setModCod(input);
    setMod(mods.filter((y) => y.moduleCode === input)[0]);
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

const handleConstraintTypeChange = (setType, setTime) => (input) => {
  const index = Constraints.findIndex((x) => x.type === input);
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
