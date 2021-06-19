import React from "react";
import Button from "@material-ui/core/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const ModSubmit = ({
  mods,
  setDisplaySearchResults,
  setDisplayConstraintForm,
}) => {
  const classes = useStyles();

  const handleSubmit = () => {
    if (mods.length === 0) {
      window.alert("No mods selected! Please select some mods");
    } else {
      setDisplaySearchResults(false);
      setDisplayConstraintForm(true);
    }
  };

  return (
    <Button className={classes.root} variant="contained" onClick={handleSubmit}>
      Submit mods!
    </Button>
  );
};

export default ModSubmit;
