import React from "react-dom";
import { Dropdown, DropdownButton, Row, Col } from "react-bootstrap";

const TimeForm = ({ time, setTime }) => {
  return (
    <div id="TimeForm">
      <Row>
        <Col lg={2}>
          <YearForm setTime={setTime} time={time} />
        </Col>
        <Col lg={2}>
          <SemForm setTime={setTime} time={time} />
        </Col>
      </Row>
    </div>
  );
};

const YearForm = ({ setTime, time }) => {
  const handleChange = (event) => {
    setTime({
      year: event.target.value,
      sem: time.sem,
    });
  };

  return (
    // <form>
    //     Year:
    //     <select id="YearInput" onChange={handleChange}>
    //         <option value="2021">2021</option>
    //         <option value="2020">2020</option>
    //     </select>
    // </form>
    <Dropdown onSelect={handleChange}>
      <Dropdown.Toggle variant="Primary" id="dropdown-basic">
        Year
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>2021</Dropdown.Item>
        <Dropdown.Item>2020</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const SemForm = ({ setTime, time }) => {
  const handleChange = (event) => {
    setTime({
      year: time.year,
      sem: event.target.value,
    });
  };
  return (
    // <form>
    //     Sem:
    //     <select id="SemInput" onChange={handleChange}>
    //         <option value="1">1</option>
    //         <option value="2">2</option>
    //     </select>
    // </form>
    <Dropdown size="sm">
      <Dropdown.Toggle variant="Primary" id="dropdown-basic">
        Semester
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TimeForm;
