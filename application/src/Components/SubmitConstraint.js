import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const SubmitConstraint = ({
  setDisplayTimetable,
  setConstraints,
  tentativeConstraints,
}) => {
  const classes = useStyles();
  const handleChange = () => {
    setDisplayTimetable(true);
    setConstraints(tentativeConstraints);
  };
  return (
    <Button variant="contained" onClick={handleChange} className={classes.root}>
      Submit constraints
    </Button>
  );
};

export default SubmitConstraint;
