import React, { Fragment, useState } from 'react'
import Constraints from './Constraints'

import { Container, Row, Col, Form, FormGroup, ListGroup, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from 'react-bootstrap/DropdownButton';

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
                {/* Constraint:
                <select onChange={handleConstraintTypeChange(setType)}>
                    {Constraints.map(ConstraintDisplay)}
                </select> */}
                <Dropdown onClick={handleConstraintTypeChange(setType)}>
                <Dropdown.Toggle variant="Primary" id="dropdown-basic">
                    Constraint: 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {Constraints.map(ConstraintDisplay)}
                </Dropdown.Menu>
                </Dropdown>
                {/* Mod: 
                <select onChange={handleModChange(setMod)}>
                    {mods.map(ModDisplay)}
                </select>
                {Constraints[type].htmlCode(setTime)}
                <button type="submit" onClick={handleSubmit(setConstraints, constraints)(type, mod, time, defaultMod)}>
                    submit constraints
                </button> */}
                </FormGroup>
            </Form>
        </div>);
}

const handleModChange = setMod => 
    event => {
        const mod = event.target.value;
        setMod(mod)
    }

const handleSubmit = (setConstraints, constraints) => 
        (type, mod, time, defaultMod) => 
        (event) => 
            {   
                event.preventDefault();
                if (typeof mod === 'undefined') {
                    setConstraints([
                        ...constraints, 
                        {
                            type: type, 
                            mod: defaultMod, 
                            time: time
                        }
                    ])
                } else {
                    setConstraints([
                        ...constraints, 
                        {
                            type: type, 
                            mod: mod, 
                            time: time
                        }
                    ])
                }
            }



const handleConstraintTypeChange = setType =>
    (event) => {
        const type = Constraints.map(x => x.type).findIndex(x => x === event.target.value)
        setType(type)
    }

const ModDisplay = mod => {
    return (
        <option key={mod}>{mod}</option>
    );
}

const ConstraintDisplay = constraint => {   
    const type = constraint.type;
    return (
        <Dropdown.Item key={constraint.id}>{type}</Dropdown.Item>
    );
}

export default ConstraintForm