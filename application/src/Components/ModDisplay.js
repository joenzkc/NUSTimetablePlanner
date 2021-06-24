import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Card,
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

const ModDisplay = ({ mods, setMods }) => {
  const classes = useStyles();

  const deleteMod = (setMods, mods) => (x) => {
    const index = mods.findIndex((y) => y === x);
    setMods([...mods.slice(0, index), ...mods.slice(index + 1, mods.length)]);
  };

  return (
    <Card>
      {mods.map((mod) => (
        <List className={classes.root} key={mod.moduleCode}>
          <ListItem>
            <ListItemText>
              {mod.moduleCode} {mod.title}
            </ListItemText>
            <ListItemIcon>
              <IconButton
                edge="end"
                onClick={() => deleteMod(setMods, mods)(mod)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
          <Divider />
        </List>
      ))}
    </Card>
  );
};

export default ModDisplay;
