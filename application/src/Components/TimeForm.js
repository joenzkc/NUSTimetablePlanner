import React, { useState } from "react";
import { Dropdown, DropdownButton, Row, Col } from "react-bootstrap";

const TimeForm = ({ time, setTime }) => {
  //time = tentativeTime, setTime = setTentative time
  return (
    <div className="btn-group" id="TimeForm">
      <YearandSemForm time={time} setTime={setTime} />
    </div>
  );
};

const YearandSemForm = ({ time, setTime }) => {
  const [title, setTitle] = useState("Sem 1 2021");

  const handleChange = (event) => {
    setTitle(event);
    console.log(event);
    const sem = Number(event.charAt(4));
    const year = Number(event.substring(6));
    if (sem == 1) {
      const yearEnd = year + 1; //ie if 2020, then 2021 so 2020-2021
      const yearRange = year.toString() + "-" + yearEnd.toString();
      setTime({
        year: yearRange,
        sem: sem.toString(),
      });
    }

    if (sem == 2) {
      const yearStart = year - 1; //ie if 2020, then 2019 so 2019-2020
      const yearRange = yearStart.toString() + "-" + year.toString();
      setTime({
        year: yearRange,
        sem: sem.toString(),
      });
    }
  };

  return (
    <DropdownButton
      title={title}
      onSelect={handleChange}
      id="dropdown-variants-secondary"
    >
      <Dropdown.Item eventKey="Sem 1 2021">Sem 1 2021</Dropdown.Item>
      <Dropdown.Item eventKey="Sem 2 2021">Sem 2 2021</Dropdown.Item>
      <Dropdown.Item eventKey="Sem 1 2020">Sem 1 2020</Dropdown.Item>
      <Dropdown.Item eventKey="Sem 2 2020">Sem 2 2020</Dropdown.Item>
    </DropdownButton>
  );
};

export default TimeForm;
