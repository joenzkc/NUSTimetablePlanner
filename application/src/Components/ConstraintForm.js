import React, { useState } from 'react'

const constraints = [
    {id: 0, 
    type: "Fix a class"}, 
    {id: 1, 
    type: "No lessons before"},
    {id: 2, 
    type: "End as early as possible"}, 
    {id: 3, 
    type: "No lessons on"}, 
    {id: 4, 
    type: "No lessons from __ to __"}
]

//to substitute with result from ModReg
const constraintDisplays = [
    <select>
        <option>9am</option>
        <option>10am</option>
        <option>11am</option>
    </select>,
    <select>
        <option>12noon</option>
        <option>1pm</option>
    </select>, 
    <select>
        <option>NIL</option>
    </select>, 
    <select>
        <option>Monday</option>
    </select>,
    <select>
        <option>1am</option>
    </select>
]

const ConstraintForm = ({displayConstraintForm, mods, constraint, setConstraints}) => {
    const [type, setType] = useState(0)
    const [mod, setMod] = useState('')

    if (!displayConstraintForm) {
        return (<div></div>);
    } else {
        return (
        <div>
            <h2>
                Select your constraints
            </h2>
            <form onSubmit={handleSubmit(setConstraints)(constraint)}>
                Mod: 
                <select>
                    {mods.map(ModDisplay)}
                </select>
                Constraint:
                <select onChange={handleConstraintTypeChange(setType)}>
                    {constraints.map(ConstraintDisplay)}
                </select>
                {constraintDisplays[type]}
            </form>
        </div>);
    }
}

const handleSubmit = setConstraints => 
    constraints => 
        () => 
            {

            }

const handleConstraintTypeChange = setType =>
    (event) => {
        const type = constraints.map(x => x.type).findIndex(x => x === event.target.value)
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
        <option key={constraint.id}>{type}</option>
    );
}

export default ConstraintForm