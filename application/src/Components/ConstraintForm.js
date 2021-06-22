import React, { Fragment, useEffect, useState } from 'react'
import Constraints from './Constraints'
import axios from 'axios'

import { Container, Row, Col, Form, FormGroup, ListGroup, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from "react-bootstrap/Button";

const ConstraintForm = ({mods, tentativeConstraints, setTentativeConstraints, actualTimet, yearSem, setActualTimet}) => {
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
            <Form onSubmit={handleSubmit(setTentativeConstraints, tentativeConstraints)(type, mod, time, defaultMod)}>
                <FormGroup>
                <div className="btn-group">
                <Dropdown>
                    <DropdownButton title={Constraints[type].type} onSelect={handleConstraintTypeChange(setType, setTime)}>
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
                {actualTimet.length !== 0 && 
                OptionCode(actualTimet, setTime, time, modCod, yearSem, setActualTimet, type)}
                <Button type="submit" onClick={handleSubmit(setTentativeConstraints, tentativeConstraints)(type, mod, time, defaultMod)}>
                    Submit constraint
                </Button>
                </div>
                </FormGroup>
            </Form>
        </div>);
}

const OptionCode = (actualTimet, setTime, time, moduleCode, yearSem, setActualTimet, type) => {
    const maybeClass = actualTimet.filter(x => x.moduleCode === moduleCode);
    console.log("maybe class is", maybeClass, "moduleCode is", moduleCode)
    if (maybeClass.length === 0) {
        console.log("actual time t is", actualTimet)
        axios.get("https://api.nusmods.com/v2/" +
            yearSem.year +
            "/modules/" +
            moduleCode +
            ".json").then((response) => {
                const thisSemData = response.data.semesterData.filter(x => x.semester === parseInt(yearSem.sem))
                console.log("this sem data is",thisSemData)
                setActualTimet([...actualTimet], {
                    moduleCode: moduleCode, 
                    lessons: thisSemData[0].timetable
                })
                return Constraints[type].optionCode(setTime, time, {
                    moduleCode: moduleCode, 
                    lessons: thisSemData[0].timetable
                })
            })
    } else {
        return Constraints[type].optionCode(setTime, time, actualTimet.filter(x => x.moduleCode === moduleCode)[0])
    }
}

const handleModChange = (setModCod, setMod, mods, modCod, type, setTime) => 
    input => {
        setModCod(input)
        setMod(mods.filter(y => y.moduleCode === input)[0])
        setTime(Constraints[type].defaultTime)
    }

const handleSubmit = (setTentativeConstraints, tentativeConstraints) => 
    (type, mod, time, defaultMod) => 
    (event) => 
        {   
            event.preventDefault();
            const check = Constraints[type].checkValid(time, tentativeConstraints)
            if (check.valid) {
                setTentativeConstraints([
                    ...tentativeConstraints, 
                    {
                        id: tentativeConstraints.length + 1, 
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
                window.alert(check.message)
            }
        }




const handleConstraintTypeChange = (setType, setTime) =>
    (input) => {
        const index = Constraints.findIndex(x => x.type === input)
        setType(index)
        setTime(Constraints[index].defaultTime)
    }

const ModDisplay = 
    mod => {
    return (
        <Dropdown.Item eventKey={mod.moduleCode} key={mod.moduleCode}>{mod.moduleCode}</Dropdown.Item>
    );
}

const ConstraintDisplay = constraint => {   
    const type = constraint.type;
    return (
        <Dropdown.Item eventKey={constraint.type} key={constraint.type}>{type}</Dropdown.Item>
    );
}

export default ConstraintForm