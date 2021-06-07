import React, { useState } from "react";
import { Dropdown, DropdownButton, Row, Col } from "react-bootstrap";

const TimeForm = ({setTime, restart}) => {
  //time = tentativeTime, setTime = setTentative time
  return (
    <div className="btn-group" id="TimeForm">
      <YearandSemForm setTime={setTime} restart={restart}/>
    </div>
  );
};

const YearandSemForm = ({setTime, restart}) => {
  const [title, setTitle] = useState("Sem 1 2020/21");

  const handleChange = (event) => {
    restart();
    setTitle(event);
    const sem = Number(event.charAt(4));
    const year = Number(event.substring(6, 10));
    const finalYear = Number("20" + event.substring(11, 13));
    setTime({year: year.toString() + "-" + finalYear.toString(), 
            sem: sem.toString()})
  };

  const cYear = new Date().getUTCFullYear();
  const cMonth = new Date().getMonth();

  const earliestYear = 2019;

  if (cMonth <=6) {

  }

  return (
    <DropdownButton
      title={title}
      onSelect={handleChange}
      id="dropdown-variants-secondary"
    >
      <Dropdown.Item eventKey="Sem 1 2020/21">Sem 1 2020/21</Dropdown.Item>
      <Dropdown.Item eventKey="Sem 2 2020/21">Sem 2 2020/21</Dropdown.Item>
      <Dropdown.Item eventKey="Sem 1 2019/20">Sem 1 2019/20</Dropdown.Item>
      <Dropdown.Item eventKey="Sem 2 2019/20">Sem 2 2019/20</Dropdown.Item>
    </DropdownButton>
  );
};

export default TimeForm;
