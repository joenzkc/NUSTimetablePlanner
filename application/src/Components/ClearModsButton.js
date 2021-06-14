import React from "react";
import Button from "@material-ui/core/Button";
import { confirmAlert } from "react-confirm-alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}));

const ClearModsButton = ({
  setMods,
  setDisplayConstraintForm,
  setDisplayTimetable,
  setConstraints,
}) => {
  const classes = useStyles();
  const handleSubmit = () => {
    confirmAlert({
      title: "Clear all mods?",
      message: "Click yes to continue",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setMods([]);
            setDisplayConstraintForm(false);
            setDisplayTimetable(false);
            setConstraints([]);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <Button className={classes.root} onClick={handleSubmit} variant="contained">
      Clear mods
    </Button>
  );
};

export default ClearModsButton;
