import React, { useState } from "react";
import { Dropdown, DropdownButton, Row, Col } from "react-bootstrap";

const TimeForm = ({setTime, setMods, setDisplaySearchResults}) => {
  //time = tentativeTime, setTime = setTentative time
  return (
    <div className="btn-group" id="TimeForm">
      <YearandSemForm setTime={setTime} setMods={setMods} setDisplaySearchResults={setDisplaySearchResults}/>
    </div>
  );
};

const YearandSemForm = ({setTime, setMods, setDisplaySearchResults }) => {
  const [title, setTitle] = useState("Sem 1 2020/21");

  const handleChange = (event) => {
    setMods([])
    setDisplaySearchResults(false)
    setTitle(event);
    const sem = Number(event.charAt(4));
    const year = Number(event.substring(6, 10));
    if (sem === 1) {
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

  // const cYear = new Date().getUTCFullYear();
  // const cMonth = new Date().getMonth();

  // const earliestYear = 2019;
  // if (cMonth )

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
