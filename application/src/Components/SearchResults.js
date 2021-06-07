import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Col, ListGroup } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modCode: {
    fontWeight: 600,
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const SearchResults = ({ searchTerm, setMods, mods, time }) => {
  const [allMods, setAllMods] = useState([]);
  const classes = useStyles();

  const link = "https://api.nusmods.com/v2/" + time.year + "/moduleList.json";

  useEffect(() => {
    axios.get(link).then((response) => {
      setAllMods(response.data);
    }).catch(err => {
      if (err.response.status === 404) {
        window.alert("Sorry, data regarding modules is not available yet");
      } else {
        throw err;
      }
    });
  }, [link]);

  const filterModsSearchTerm = allMods.filter((x) =>
    x.moduleCode.toUpperCase().includes(searchTerm.toUpperCase())
  );

  const filterModsSem = filterModsSearchTerm.filter(
    (mod) => mod.semesters.findIndex((y) => y === parseInt(time.sem)) !== -1
  );

  const furtherFilteredMods = filterModsSem.filter(
    (x) => mods.findIndex((y) => y === x) === -1
  );

  const DisplayMod = (setMods, mods) => (mod) => {
    return (
      <Card>
        <List className={classes.root}>
          <ListItem>
            <ListItemText>
              {mod.moduleCode} {mod.title}
            </ListItemText>
            <ListItemIcon>
              <IconButton edge="end" onClick={() => addMod(setMods, mods)(mod)}>
                <AddIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        </List>
      </Card>
    );
  };

  return (
    <Col>
      <ListGroup>
        {furtherFilteredMods.length === 0
          ? <span> Sorry, no search results </span>
          : furtherFilteredMods.map(DisplayMod(setMods, mods))}
      </ListGroup>
    </Col>
  );
};

const addMod = (setMods, mods) => (mod) => {
  const newMods = [...mods, mod];
  setMods(newMods);
};

export default SearchResults;
