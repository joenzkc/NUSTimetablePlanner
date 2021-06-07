import React from "react";
import Button from "@material-ui/core/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const ModSubmit = ({
  mods,
  setDisplaySearchResults,
  setDisplayConstraintForm,
}) => {
  const handleSubmit = () => {
    if (mods.length === 0) {
      window.alert("No mods selected! Please select some mods");
    } else {
      setDisplaySearchResults(false);
      setDisplayConstraintForm(true);
    }
  };

  return (
    <Button variant="contained" onClick={handleSubmit}>
      Submit mods!
    </Button>
  );
};

export default ModSubmit;
