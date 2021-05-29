import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Container, Row, Col, Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { IconButton } from "@material-ui/core";

const SearchResults = ({ searchTerm, setMods, mods, time }) => {
  const [allMods, setAllMods] = useState([]);
  
  const link = "https://api.nusmods.com/v2/" + time.year + "/moduleList.json";
  
  useEffect(() => {
    axios.get(link).then((response) => {
      setAllMods(response.data);
    });
  }, []);

  const filterModsSearchTerm = allMods.filter((x) =>
    x.moduleCode.toUpperCase().includes(searchTerm.toUpperCase())
  );

  const filterModsSem = filterModsSearchTerm.filter(
    (mod) => mod.semesters.findIndex((y) => y === parseInt(time.sem)) !== -1
  );
  const furtherFilteredMods = filterModsSem.filter(
    (x) => mods.findIndex((y) => y === x) === -1
  );

  return (
    <Col>
      <ListGroup>
        {furtherFilteredMods.map(DisplayMod(setMods, mods))}
      </ListGroup>
    </Col>
  );
};

const DisplayMod = (setMods, mods) => (mod) => {
  return (
    <ListGroup.Item key={mod.moduleCode}>
      <Row>
        <Col lg={10}>
          {mod.moduleCode} {mod.title}
        </Col>
        <Col lg={2}>
          <AddButton setMods={setMods} mods={mods} mod={mod} />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

const AddButton = ({ setMods, mods, mod }) => {
  return (
    <IconButton onClick={() => addMod(setMods, mods)(mod)}>
      <AddIcon style={{ cursor: "pointer" }} />
    </IconButton>
  );
};

const addMod = (setMods, mods) => (mod) => {
  const newMods = [...mods, mod];
  setMods(newMods);
};

export default SearchResults;
