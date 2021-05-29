import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { FormGroup } from "@material-ui/core";

const ModForm = ({
  searchTerm,
  setSearchTerm,
  setDisplaySearchResults,
  setDisplayConstraintForm,
  tentativeTime, 
  setTime, 
}) => {
  return (
    <div id="ModForm">
      <ModInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setDisplaySearchResults={setDisplaySearchResults}
        setDisplayConstraintForm={setDisplayConstraintForm}
        tentativeTime={tentativeTime}
        setTime={setTime}
      />
    </div>
  );
};

const ModInput = ({
  searchTerm,
  setSearchTerm,
  setDisplaySearchResults,
  setDisplayConstraintForm,
  tentativeTime, 
  setTime
}) => {
  const [newSearchTerm, setNewSearchTerm] = useState("");

  const handleSubmit = (event) => {
    if (tentativeTime.year === "Year" || tentativeTime.sem === "sem") {
      window.alert("Please enter the year and semester!")
    } else {
      setTime(tentativeTime);
      event.preventDefault();
      setDisplaySearchResults(true);
      setDisplayConstraintForm(false);
      setSearchTerm(newSearchTerm);
    }
  };

  const handleChange = (event) => {
    setNewSearchTerm(event.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Label>Enter mod code</Form.Label>
        <Row>
          <Col lg={10}>
            <Form.Control
              type="text"
              placeholder="mod code"
              onChange={handleChange}
            />
          </Col>
          <Col lg={2}>
            <IconButton
              onClick={handleSubmit}
              style={{ width: "100%", minWidth: "100%" }}
            >
              <SearchIcon />
            </IconButton>
          </Col>
        </Row>
      </FormGroup>
    </Form>
  );
};

export default ModForm;