import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const ModSubmit = ({
  mods,
  setDisplaySearchResults,
  setDisplayConstraintForm,
}) => {
  
  const handleSubmit = () => {
    setDisplaySearchResults(false);
    setDisplayConstraintForm(true);
  };

  return (
    <Button id="SubmitMod" onClick={handleSubmit}>
      Submit mods!
    </Button>
  );
};

export default ModSubmit;
