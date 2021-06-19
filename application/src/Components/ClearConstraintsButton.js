import React from "react";
import Button from "@material-ui/core/Button";
import { confirmAlert } from "react-confirm-alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const ClearConstraintsButton = ({
  setConstraints,
  setTentativeConstraints,
  setDisplayTimetable,
}) => {
  const classes = useStyles();
  const handleSubmit = () => {
    confirmAlert({
      title: "Clear all constraints?",
      message: "Click yes to continue",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setConstraints([]);
            setTentativeConstraints([]);
            setDisplayTimetable(false);
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
      Clear constraints
    </Button>
  );
};

export default ClearConstraintsButton;
