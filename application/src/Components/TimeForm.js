import React from "react-dom";
import { Dropdown, DropdownButton, Row, Col } from "react-bootstrap";

const TimeForm = ({ time, setTime }) => {
  return (
    <div className="btn-group" id="TimeForm">
      <h6>Choose the semester</h6>
      <YearForm setTime={setTime} time={time} />
      <SemForm setTime={setTime} time={time} />
    </div>
  );
};

const YearForm = ({ setTime, time }) => {
  const handleChange = (input) => {
    console.log(input);
    setTime({
      year: input,
      sem: time.sem,
    });
  };

  return (
    <Dropdown>
      <DropdownButton title={time.year} onSelect={handleChange}>
        <Dropdown.Item eventKey="2020-2021">2020-2021</Dropdown.Item>
        <Dropdown.Item eventKey="2019-2020">2019-2020</Dropdown.Item>
      </DropdownButton>
    </Dropdown>
  );
};

const SemForm = ({ setTime, time }) => {
  const handleChange = (input) => {
    setTime({
      year: time.year,
      sem: input,
    });
  };
  return (
    <Dropdown>
      <DropdownButton title={time.sem} onSelect={handleChange}>
        <Dropdown.Item eventKey="1">1</Dropdown.Item>
        <Dropdown.Item eventKey="2">2</Dropdown.Item>
      </DropdownButton>
    </Dropdown>
  );
};

export default TimeForm;
