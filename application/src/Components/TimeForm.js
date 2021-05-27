import React from "react-dom";
import { Dropdown, DropdownButton, Row, Col } from "react-bootstrap";

const TimeForm = ({ time, setTime }) => {
  return (
    <div className="btn-group" id="TimeForm">
      <YearForm setTime={setTime} time={time} />
      <SemForm setTime={setTime} time={time} />
      {/* <Row>
        <Col lg={2}>
          <YearForm setTime={setTime} time={time} />
        </Col>
        <Col lg={2}>
          <SemForm setTime={setTime} time={time} />
        </Col>
      </Row> */}
    </div>
  );
};

const YearForm = ({ setTime, time }) => {
  const handleChange = (input) => {
    console.log(input)
    setTime({
      year: input,
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
    <Dropdown>
      <DropdownButton title={time.year} onSelect={handleChange}>
        <Dropdown.Item eventKey="2021">2021</Dropdown.Item>
        <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
      </DropdownButton>
    </Dropdown>
    // <Dropdown>
    //   <Dropdown.Toggle variant="Primary" id="dropdown-basic" onSelect={handleChange}>
    //     Year
    //   </Dropdown.Toggle>
    //   <Dropdown.Menu >
    //     <Dropdown.Item eventKey="2021">2021</Dropdown.Item>
    //     <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
    //   </Dropdown.Menu>
    // </Dropdown>
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
    // <form>
    //     Sem:
    //     <select id="SemInput" onChange={handleChange}>
    //         <option value="1">1</option>
    //         <option value="2">2</option>
    //     </select>
    // </form>
    <Dropdown>
      <DropdownButton title={time.sem} onSelect={handleChange}>
        <Dropdown.Item eventKey="1">1</Dropdown.Item>
        <Dropdown.Item eventKey="2">2</Dropdown.Item>
      </DropdownButton>
    </Dropdown>
  );
};

export default TimeForm;
