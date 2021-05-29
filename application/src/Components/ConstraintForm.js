import React, { Fragment, useState } from 'react'
import Constraints from './Constraints'

import { Container, Row, Col, Form, FormGroup, ListGroup, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from "react-bootstrap/Button";

const ConstraintForm = ({mods, constraints, setConstraints, yearSem}) => {
    const [type, setType] = useState(0)
    //dunno why by default it is undefined
    const [modCod, setModCod] = useState(mods[0].moduleCode)
    const [mod, setMod] = useState(mods[0])
    //Change default for this.
    const [time, setTime] = useState(Constraints[0].defaultTime)
    const defaultMod = mods[0].moduleCode

    return (
        <div>
            <h2>
                Select your constraints
            </h2>
            <Form onSubmit={handleSubmit(setConstraints, constraints)(type, mod, time, defaultMod)}>
                <FormGroup>
                <div class="btn-group">
                <Dropdown>
                    <DropdownButton title={Constraints[type].type} onSelect={handleConstraintTypeChange(setType, setTime, mod, yearSem)}>
                        {Constraints.map(ConstraintDisplay)}
                    </DropdownButton>
                </Dropdown>
                {Constraints[type].needToSpecifyMod && 
                <Dropdown>
                    <DropdownButton title={modCod} onSelect={handleModChange(setModCod, setMod, mods, modCod, type, setTime)}>
                        {mods.map(ModDisplay)}
                    </DropdownButton>
                </Dropdown>                
                }
                {Constraints[type].optionCode(setTime, time, mod, yearSem)}
                <Button type="submit" onClick={handleSubmit(setConstraints, constraints)(type, mod, time, defaultMod)}>
                    Submit constraint
                </Button>
                </div>
                </FormGroup>
            </Form>
        </div>);
}

const handleModChange = (setModCod, setMod, mods, modCod, type, setTime) => 
    input => {
        setModCod(input)
        setMod(mods.filter(y => y.moduleCode === modCod)[0])
        setTime(Constraints[type].defaultTime)
    }

const handleSubmit = (setConstraints, constraints) => 
        (type, mod, time, defaultMod) => 
        (event) => 
            {   
                event.preventDefault();
                const check = Constraints[type].checkValid(time, constraints)
                if (check.valid) {
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
                } else {
                    //make this more detailed
                    window.alert(check.message)
                }
            }



const handleConstraintTypeChange = (setType, setTime, mod, semYear) =>
    (input) => {
        const index = Constraints.findIndex(x => x.type === input)
        setType(index)
        setTime(Constraints[index].defaultTime)
    }

const ModDisplay = x => {
    return (
        <Dropdown.Item eventKey={x.moduleCode}>{x.moduleCode}</Dropdown.Item>
    );
}

const ConstraintDisplay = constraint => {   
    const type = constraint.type;
    return (
        <Dropdown.Item eventKey={constraint.type}>{type}</Dropdown.Item>
    );
}

export default ConstraintForm