import React from "react";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Constraints from "./Constraints";
import { ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ConstraintDisplay = ({ constraints, setConstraints }) => {
  return (
    <ListGroup>
      {constraints.map(Display(setConstraints, constraints))}
    </ListGroup>
  );
};

const Display = (setConstraints, constraints) => (x) => {
  return (
    <ListGroup.Item key={constraints.id}>
      {Constraints[x.type].displayCode(x, true)}
      <IconButton
        onClick={() => deleteConstraint(setConstraints, constraints)(x)}
      >
        <DeleteIcon />
      </IconButton>
    </ListGroup.Item>
  );
};

const deleteConstraint = (setConstraints, constraints) => (x) => {
  const index = constraints.findIndex((y) => y === x);
  setConstraints([
    ...constraints.slice(0, index),
    ...constraints.slice(index + 1, constraints.length),
  ]);
};

export default ConstraintDisplay;
