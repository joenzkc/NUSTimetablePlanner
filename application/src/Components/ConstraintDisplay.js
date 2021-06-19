import React from "react";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Constraints from "./Constraints";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
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
    backgroundColor: theme.palette.background.paper,
  },
}));

const ConstraintDisplay = ({ constraints, setConstraints }) => {
  const classes = useStyles();
  const Display = (setConstraints, constraints) => (x) => {
    return (
      <Card>
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
          <Divider />
        </List>
      </Card>
    );
  };

  return <Card>{constraints.map(Display(setConstraints, constraints))}</Card>;
};

const deleteConstraint = (setConstraints, constraints) => (x) => {
  const index = constraints.findIndex((y) => y === x);
  setConstraints([
    ...constraints.slice(0, index),
    ...constraints.slice(index + 1, constraints.length),
  ]);
};

export default ConstraintDisplay;
