import React from "react";
import Button from "@material-ui/core/Button";
import { confirmAlert } from "react-confirm-alert";

const ClearModsButton = ({
  setMods,
  setDisplayConstraintForm,
  setDisplayTimetable,
  setConstraints,
}) => {
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
    <Button onClick={handleSubmit} variant="contained">
      Clear mods
    </Button>
  );
};

export default ClearModsButton;
