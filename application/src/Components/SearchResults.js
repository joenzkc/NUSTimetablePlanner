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
  Typography,
  Card,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
    axios
      .get(link)
      .then((response) => {
        setAllMods(response.data);
      })
      .catch((err) => {
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
    (x) => mods.findIndex((y) => y.moduleCode === x.moduleCode) === -1
  );

  const [displayNumber, setDisplayNumber] = useState(25);

  useEffect(() => {
    setDisplayNumber(25);
  }, [searchTerm]);

  const DisplayMod = (setMods, mods) => (mod) => {
    return (
      <Card key={mod.moduleCode} style={{ margin: 1 }}>
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
        {furtherFilteredMods.length === 0 ? (
          <span> Sorry, no search results </span>
        ) : (
          furtherFilteredMods
            .map(DisplayMod(setMods, mods))
            .slice(0, displayNumber)
        )}
      </ListGroup>
      {furtherFilteredMods.length > displayNumber && (
        <Grid container>
          <Grid item>
            <IconButton
              edge="end"
              onClick={() => setDisplayNumber(displayNumber + 25)}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Grid>
          <Grid
            item
            align="center"
            style={{
              padding: 10,
            }}
          >
            <Typography align="justify">Display more</Typography>
          </Grid>
        </Grid>
      )}
    </Col>
  );
};

const addMod = (setMods, mods) => (mod) => {
  const newMods = [...mods, mod];
  setMods(newMods);
};

export default SearchResults;
