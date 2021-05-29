import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { FormGroup, Paper, Icon } from "@material-ui/core";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
} from "@material-ui/core/styles";
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
    width: 300,
  },
}));

const ModInput = ({
  setSearchTerm,
  setDisplaySearchResults,
  setDisplayConstraintForm,
  tentativeTime,
  setTime,
}) => {
  const classes = useStyles();
  const [newSearchTerm, setNewSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setTime(tentativeTime);
    setDisplaySearchResults(true);
    setDisplayConstraintForm(false);
    setSearchTerm(newSearchTerm);
    console.log(event.target.value);
  };

  const handleChange = (event) => {
    setNewSearchTerm(event.target.value);
  };

  return (
    <div>
      {/* <Paper className={classes.root}> */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Search for a module"
          id="margin-normal"
          name="name"
          className={classes.textField}
          onChange={handleChange}
          helperText="Enter a mod number e.g CS1010, GER1000"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
        >
          Search
        </Button>
      </form>
      {/* </Paper> */}
    </div>
  );
};

export default ModInput;
