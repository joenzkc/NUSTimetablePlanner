import React from "react";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Constraints from "./Constraints";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  makeStyles,
} from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles((theme) => ({
  modCode: {
    fontWeight: 600,
  },
  root: {
    width: "100%",
  },
  card: {
    margin: 2,
  },
}));

const ConstraintDisplay = ({ constraints, setConstraints }) => {
  const classes = useStyles();
  const Display = (setConstraints, constraints) => (x) => {
    return (
      <Card
        className={classes.card}
        key={Constraints[x.type].displayCode(x, false)}
      >
        <List className={classes.root}>
          <ListItem>
            <ListItemText>
              {Constraints[x.type].displayCode(x, true)}
            </ListItemText>
            <ListItemIcon>
              <IconButton
                edge="end"
                onClick={() => deleteConstraint(setConstraints, constraints)(x)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        </List>
      </Card>
    );
  };

  return <div>{constraints.map(Display(setConstraints, constraints))}</div>;
};

const deleteConstraint = (setConstraints, constraints) => (x) => {
  const index = constraints.findIndex((y) => y === x);
  setConstraints([
    ...constraints.slice(0, index),
    ...constraints.slice(index + 1, constraints.length),
  ]);
};

export default ConstraintDisplay;
