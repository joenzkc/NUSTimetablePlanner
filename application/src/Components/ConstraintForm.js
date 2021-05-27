import React, { Fragment, useState } from 'react'
import Constraints from './Constraints'

import { Container, Row, Col, Form, FormGroup, ListGroup, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from "react-bootstrap/Button";

const ConstraintForm = ({mods, constraints, setConstraints}) => {
    const [type, setType] = useState(0)
    //dunno why by default it is undefined
    const [mod, setMod] = useState(mods[0])
    //Change default for this.
    const [time, setTime] = useState("9am")
    const defaultMod = mods[0]

    // <Dropdown onSelect={handleChange}>
    //   <Dropdown.Toggle variant="Primary" id="dropdown-basic">
    //     Year
    //   </Dropdown.Toggle>
    //   <Dropdown.Menu>
    //     <Dropdown.Item>2021</Dropdown.Item>
    //     <Dropdown.Item>2020</Dropdown.Item>
    //   </Dropdown.Menu>
    // </Dropdown>

    return (
        <div>
            <h2>
                Select your constraints
            </h2>
            <Form onSubmit={handleSubmit(setConstraints, constraints)(type, mod, time, defaultMod)}>
                <FormGroup>
                <div class="btn-group">
                <Dropdown>
                    <DropdownButton title={Constraints[type].type} onSelect={handleConstraintTypeChange(setType, setTime)}>
                        {Constraints.map(ConstraintDisplay)}
                    </DropdownButton>
                </Dropdown>
                {Constraints[type].needToSpecifyMod && 
                <Dropdown>
                    <DropdownButton title={mod} onSelect={handleModChange(setMod)}>
                        {mods.map(ModDisplay)}
                    </DropdownButton>
                </Dropdown>                
                }
                {Constraints[type].optionCode(setTime, time)}
                <Button type="submit" onClick={handleSubmit(setConstraints, constraints)(type, mod, time, defaultMod)}>
                    Submit constraint
                </Button>
                {/* Mod: 
                <select onChange={handleModChange(setMod)}>
                    {mods.map(ModDisplay)}
                </select>
                {Constraints[type].htmlCode(setTime)}
                <button type="submit" onClick={handleSubmit(setConstraints, constraints)(type, mod, time, defaultMod)}>
                    submit constraints
                </button> */}
                </div>
                </FormGroup>
            </Form>
        </div>);
}

const handleModChange = setMod => 
    input => {
        setMod(input)
    }

const handleSubmit = (setConstraints, constraints) => 
        (type, mod, time, defaultMod) => 
        (event) => 
            {   
                event.preventDefault();
                    setConstraints([
                        ...constraints, 
                        {
                            type: type, 
                            mod: Constraints[type].needToSpecifyMod
                                ? typeof mod === 'undefined'
                                    ? defaultMod
                                    : mod
                                : null, 
                            time: time
                        }
                    ])
            }



const handleConstraintTypeChange = (setType, setTime) =>
    (input) => {
        const index = Constraints.findIndex(x => x.type === input)
        setType(index)
        setTime(Constraints[index].defaultTime)
    }

const ModDisplay = mod => {
    return (
        <Dropdown.Item eventKey={mod}>{mod}</Dropdown.Item>
    );
}

const ConstraintDisplay = constraint => {   
    const type = constraint.type;
    return (
        <Dropdown.Item eventKey={constraint.type}>{type}</Dropdown.Item>
    );
}

export default ConstraintForm