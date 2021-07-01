import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  root: {
    padding: theme.spacing(3, 2),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 320,
  },
}));

const ModInput = ({
  setSearchTerm,
  setDisplaySearchResults,
  setDisplayConstraintForm,
  tentativeTime,
  setTime,
  setDisplayTimetable
}) => {
  const classes = useStyles();
  const [newSearchTerm, setNewSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setTime(tentativeTime);
    setDisplayTimetable(false);
    setDisplaySearchResults(true);
    setDisplayConstraintForm(false);
    setSearchTerm(newSearchTerm);
  };

  const handleChange = (event) => {
    setNewSearchTerm(event.target.value);
  };

  return (
    <div>
        <TextField
          label="Search for a module. Try 'CS' or 'GER'"
          id="margin-normal"
          name="name"
          className={classes.textField}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="default"
          className={classes.button}
          onClick={handleSubmit}
        >
          Search
        </Button>
    </div>
  );
};

export default ModInput;
