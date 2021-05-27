import React, {Fragment} from 'react'
import { Container, Row, Col, Form, FormGroup, ListGroup, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from 'react-bootstrap/DropdownButton';

//htmlCode should be substituted by a function that can generate 
//the code using the information from NUSMods. Eg. (information from NUSMogs) => html code
//defaultTime for fix a class should also be changed from being hardcoded

const standardDisplayCode = (constraint, type) => 
<span> {type} {Constraints[constraint.type].needToSpecifyMod && constraint.mod.moduleCode} {constraint.time !== null && constraint.time} </span>

const Constraints = [
    {id: 0, 
    type: "Fix a class: ", 
    defaultTime: "9am",
    needToSpecifyMod: true,
    optionCode:   (setTime, time) => 
                <Dropdown>
                    <DropdownButton title={time} onSelect={handleChangeTime(setTime)}>
                        <Dropdown.Item eventKey="9am">9am</Dropdown.Item>
                        <Dropdown.Item eventKey="10am">10am</Dropdown.Item>
                    </DropdownButton>
                </Dropdown>, 
    displayCode: constraint => standardDisplayCode(constraint, "Fix a class: ")}, 
    {id: 1, 
    type: "No lessons before",
    defaultTime: "12noon",
    needToSpecifyMod: false,
    optionCode:   (setTime, time) =>
                <Dropdown>
                    <DropdownButton title={time} onSelect={handleChangeTime(setTime)}>
                        <Dropdown.Item eventKey="12noon">12noon</Dropdown.Item>
                        <Dropdown.Item eventKey="1pm">1pm</Dropdown.Item>
                    </DropdownButton>
                </Dropdown>, 
    displayCode: constraint => standardDisplayCode(constraint, "No lessons before")},
    {id: 2, 
    type: "No lessons on", 
    defaultTime: "Monday",
    needToSpecifyMod: false,
    optionCode:   (setTime, time) => 
                <Dropdown>
                    <DropdownButton title={time} onSelect={handleChangeTime(setTime)}>
                        <Dropdown.Item eventKey ="Monday">Monday</Dropdown.Item>
                        <Dropdown.Item eventKey ="Tuesday">Tuesday</Dropdown.Item>
                        <Dropdown.Item eventKey ="Wednesday">Wednesday</Dropdown.Item>
                        <Dropdown.Item eventKey ="Thursday">Thursday</Dropdown.Item>
                        <Dropdown.Item eventKey ="Friday">Friday</Dropdown.Item>
                    </DropdownButton>
                </Dropdown>, 
    displayCode: constraint => standardDisplayCode(constraint, "No lessons on")}, 
    {id: 3, 
    type: "No lessons on __ from __ to __", 
    defaultTime: ["Monday", "1am", "2am"],
    needToSpecifyMod: false,
    optionCode:   (setTime, time) => 
                <Dropdown>
                    <div class="btn-group">
                    <DropdownButton title={time[0]} onSelect={handleStartTimeChange(setTime, time, 0)}>
                        <Dropdown.Item eventKey="Monday">Monday</Dropdown.Item>
                        <Dropdown.Item eventKey="Tuesday">Tuesday</Dropdown.Item>
                        <Dropdown.Item eventKey="Wednesday">Wednesday</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton title={time[1]} onSelect={handleStartTimeChange(setTime, time, 1)}>
                        <Dropdown.Item eventKey="1am">1am</Dropdown.Item>
                        <Dropdown.Item eventKey="2am">2am</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton title={time[2]} onSelect={handleStartTimeChange(setTime, time, 2)}>
                        <Dropdown.Item eventKey="2am">2am</Dropdown.Item>
                        <Dropdown.Item eventKey="3am">3am</Dropdown.Item>
                    </DropdownButton>
                    </div>
                </Dropdown>, 
    displayCode: constraint => 
        <span>No lessons on {constraint.time[0]} from {constraint.time[1]} to {constraint.time[2]} </span>
                },
    {id: 4, 
        type: "End as early as possible",
        defaultTime: null,
        needToSpecifyMod: false,
        optionCode:   (setTime, time) => 
                        <span></span>, 
        displayCode: constraint => standardDisplayCode(constraint, "End as early as possible")}, 
]

const handleChangeTime = setTime => 
    (input) => {   
        console.log(input)
        setTime(input)
    }

const handleStartTimeChange = (setTime, time, index) => 
    (input) => {
        setTime([
            ...time.slice(0, index), 
            input, 
            ...time.slice(index + 1, time.length)
        ])
    }

export default Constraints