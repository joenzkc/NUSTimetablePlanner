import React from "react";
import Button from "@material-ui/core/Button";

const SubmitConstraint = ({ setDisplayTimetable }) => {
  const handleChange = () => {
    setDisplayTimetable(true);
  };
  return (
    <Button variant="contained" onClick={handleChange}>
      Submit constraints
    </Button>
  );
};

export default SubmitConstraint;
