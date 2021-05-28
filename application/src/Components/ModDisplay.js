import React, { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { FormGroup, Paper, Icon } from "@material-ui/core";
import { Container, Row, Col, Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ModDisplay = ({ mods, setMods }) => {
  return (
    <ListGroup id="ModDisplay">{mods.map(Display(setMods, mods))}</ListGroup>
  );
};

const Display = (setMods, mods) => (x) => {
  return (
    <Paper>
      <Row>
        <Col lg={10}>
          {x.moduleCode} {x.title}
        </Col>
        <Col lg={2}>
          <IconButton onClick={() => deleteMod(setMods, mods)(x)}>
            <DeleteIcon />
          </IconButton>
        </Col>
      </Row>
    </Paper>
  );
};

const deleteMod = (setMods, mods) => (x) => {
  const index = mods.findIndex((y) => y === x);
  setMods([...mods.slice(0, index), ...mods.slice(index + 1, mods.length)]);
};

export default ModDisplay;
