import React from "react";
import Button from "@material-ui/core/Button";

const SubmitConstraint = ({ setDisplayTimetable, setConstraints, tentativeConstraints}) => {
  const handleChange = () => {
    setDisplayTimetable(true);
    setConstraints(tentativeConstraints)
  };
  return (
    <Button variant="contained" onClick={handleChange}>
      Submit constraints
    </Button>
  );
};

export default SubmitConstraint;
